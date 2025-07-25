import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Todo item type definition
type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoScreen() {
  // State for todos and input text - starting with empty list
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Add new todo
  const addTodo = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter a todo item');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputText('');
    Alert.alert('Success', 'Todo added successfully!');
  };

  // Update function - directly enter edit mode
  const handleUpdate = (item: TodoItem) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  // Save edited todo
  const handleSave = () => {
    if (editingText.trim() === '') {
      Alert.alert('Error', 'Please enter a todo item');
      return;
    }

    if (!editingId) {
      Alert.alert('Error', 'No todo selected for editing');
      return;
    }

    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === editingId 
          ? { ...todo, text: editingText.trim() } 
          : todo
      )
    );
    
    setEditingId(null);
    setEditingText('');
    Alert.alert('Success', 'Todo updated successfully!');
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed } 
          : todo
      )
    );
  };

  // Delete all todos with loading state
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const deleteAllTodos = () => {
    console.log('=== DELETE ALL FUNCTION START ===');
    console.log('Current todos count:', todos.length);
    
    if (todos.length === 0) {
      Alert.alert('Info', 'No todos to delete');
      return;
    }

    // Set loading state immediately
    setIsDeletingAll(true);
    console.log('Loading state set for delete all');
    
    // Delete all todos immediately
    setTodos([]);
    console.log('All todos deleted');
    
    // Clear loading state after short delay
    setTimeout(() => {
      setIsDeletingAll(false);
      console.log('Delete all completed');
    }, 100);
  };



  // Delete function - fixed version
  const handleDelete = (id: string) => {
    console.log('=== DELETE FUNCTION START ===');
    console.log('Deleting todo with id:', id);
    
    const todoToDelete = todos.find(todo => todo.id === id);
    console.log('Todo to delete:', todoToDelete);
    
    // Use a simpler approach without Alert
    if (todoToDelete) {
      console.log('Deleting immediately without Alert');
      setIsDeleting(id);
      
      setTodos(prevTodos => {
        const newTodos = prevTodos.filter(todo => todo.id !== id);
        console.log('New todos after delete:', newTodos);
        return newTodos;
      });
      
      setTimeout(() => {
        setIsDeleting(null);
        console.log('Delete completed');
      }, 100);
    }
  };

  // Render individual todo item
  const renderTodoItem = ({ item }: { item: TodoItem }) => {
    return (
      <View style={styles.todoItemContainer}>
        {editingId === item.id ? (
          // Edit mode - buttons above input
          <View style={styles.editContainer}>
            <View style={styles.editButtonContainer}>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleSave}
                activeOpacity={0.7}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.editInput}
              value={editingText}
              onChangeText={setEditingText}
              autoFocus
              placeholder="Edit todo..."
              maxLength={50}
            />
          </View>
        ) : (
          // View mode
          <View style={styles.todoItem}>
            <TouchableOpacity 
              style={styles.todoTextContainer}
              onPress={() => toggleTodo(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.todoText,
                item.completed && styles.completedTodoText
              ]}>
                {item.completed ? '✓ ' : '○ '}{item.text}
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdate(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.updateButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  console.log('Delete button pressed for item:', item);
                  handleDelete(item.id);
                }}
                disabled={isDeleting === item.id}
                activeOpacity={0.7}
              >
                {isDeleting === item.id ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.deleteButtonText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Todo List</Text>
          {todos.length > 0 && (
            <TouchableOpacity 
              style={styles.deleteAllButton}
              onPress={() => {
                console.log('Delete All button pressed');
                deleteAllTodos();
              }}
              disabled={isDeletingAll}
              activeOpacity={0.7}
            >
              {isDeletingAll ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.deleteAllButtonText}>Delete All</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Main content container */}
      <View style={styles.mainContainer}>
        {/* Todo list */}
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          extraData={todos.length}
          removeClippedSubviews={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No todos yet</Text>
              <Text style={styles.emptySubText}>Add your first todo to get started!</Text>
            </View>
          }
        />

        {/* Separator line - only show if there are todos */}
        {todos.length > 0 && <View style={styles.separator} />}

        {/* Input section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Add a Todo"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addTodo}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteAllButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteAllButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'left',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    color: '#8E8E93',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#C7C7CC',
    textAlign: 'center',
    fontWeight: '400',
  },
  todoItemContainer: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 17,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 16,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 17,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  editContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  editButtonContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  editInput: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 17,
    backgroundColor: '#F8F9FA',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 80,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 80,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
