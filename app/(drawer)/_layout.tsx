import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useTheme } from '../../src/hooks';
import CustomDrawer from '../../src/navigation/CustomDrawer';
import { Colors } from '../../src/theme';

/**
 *
 * @returns
 */
const DrawerLayout = () => {
  const { theme } = useTheme(() => ({}));

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors[theme]?.secondary,
        drawerInactiveTintColor: Colors[theme]?.gray,
        drawerStyle: {
          backgroundColor: Colors[theme]?.white
        }
      }}
      initialRouteName="(tabs)"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons size={size} name="settings" color={color} />
          )
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
