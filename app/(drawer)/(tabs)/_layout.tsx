import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTheme } from '../../../src/hooks';
import { Colors } from '../../../src/theme';

/**
 *
 * @returns
 */
const TabLayout = () => {
  const { theme } = useTheme(() => ({}));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[theme]?.secondary,
        tabBarInactiveTintColor: Colors[theme]?.gray,
        tabBarStyle: {
          backgroundColor: Colors[theme]?.white,
          borderTopColor: Colors[theme]?.gray,
          borderTopWidth: 0.5
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons size={size} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="view-list" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
