import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomHeader } from '../../../src/components';

/**
 *
 * @returns
 */
const Home = () => {
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
        title="Home"
        customLeftView={
          <MaterialIcons name="menu" size={30} color="black" onPress={handleOpenDrawer} />
        }
      />
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
