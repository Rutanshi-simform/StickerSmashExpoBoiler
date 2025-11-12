import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomHeader } from '../../src/components';
import { Colors } from '../../src/theme';

/**
 *
 * @returns
 */
const Settings = () => {
  const navigation = useNavigation();

  /**
   *
   */
  const handleOpenDrawer = () => {
    // @ts-ignore - Expo Router drawer navigation
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Settings'}
        customLeftView={
          <MaterialIcons name="menu" size={30} color="black" onPress={handleOpenDrawer} />
        }
      />
      <Text>Change Theme</Text>
      <Text>Light</Text>
      <Text>Dark</Text>
      <Text>System Default</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    flex: 1
  }
});
export default Settings;
