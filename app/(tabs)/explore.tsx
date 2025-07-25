import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LearnScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>React Native Learning Guide</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 What is React Native?</Text>
        <Text style={styles.description}>
          React Native is a framework that lets you build mobile apps using JavaScript and React. 
          You can create apps for both iOS and Android with the same code!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 What You Just Built</Text>
        <Text style={styles.description}>
          You just created a Todo List app! Here&apos;s what each part does:
        </Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            • useState() - Manages data in your app{'\n'}
            • TextInput - Lets users type text{'\n'}
            • TouchableOpacity - Makes buttons{'\n'}
            • FlatList - Shows lists of items{'\n'}
            • StyleSheet - Makes your app look good
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Next Steps to Learn</Text>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => openLink('https://reactnative.dev/docs/tutorial')}
        >
          <Text style={styles.linkButtonText}>📖 Official Tutorial</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => openLink('https://expo.dev/learn')}
        >
          <Text style={styles.linkButtonText}>⚡ Expo Learning</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => openLink('https://reactnative.dev/docs/components-and-apis')}
        >
          <Text style={styles.linkButtonText}>🔧 Components Guide</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Try These Features</Text>
        <Text style={styles.description}>
          Add these features to your Todo app to learn more:
        </Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• Add due dates to todos</Text>
          <Text style={styles.featureItem}>• Save todos to device storage</Text>
          <Text style={styles.featureItem}>• Add categories (work, personal)</Text>
          <Text style={styles.featureItem}>• Add search functionality</Text>
          <Text style={styles.featureItem}>• Add dark mode toggle</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ Useful Commands</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            npm start - Start your app{'\n'}
            npm run ios - Run on iOS simulator{'\n'}
            npm run android - Run on Android{'\n'}
            npm run web - Run in web browser
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
  },
  codeBlock: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  codeText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#333',
    lineHeight: 20,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
});
