import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todo List',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📝</Text>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 24 }}>📚</Text>,
        }}
      />
    </Tabs>
  );
}
