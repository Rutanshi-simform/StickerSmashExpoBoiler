import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MyModuleView } from '../../../modules/my-module';
import { CustomHeader } from '../../../src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webViewContainer: {
    height: '50%',
    marginVertical: 10,
    width: '100%'
  }
});

/**
 *
 * @returns
 */
const Feed = () => {
  const navigation = useNavigation();

  /**
   *
   */
  const fetchGreeting = async () => {
    try {
      const response = await fetch('/api/greeting');
      const data = await response.json();
      alert(data.greeting);
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  };

  /**
   *
   */
  const postGreeting = async () => {
    const response = await fetch('/api/greeting?name=rutu', {
      method: 'POST'
    });
    const data = await response.json();
    alert(data.greeting);
  };
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
        title="Feed"
        customLeftView={
          <MaterialIcons name="menu" size={30} color="black" onPress={handleOpenDrawer} />
        }
      />
      <MyModuleView style={styles.webViewContainer} url={'https://reactnative.dev/'} />
      <Text style={{ fontSize: 20 }}>Deployment of api</Text>
      <Pressable onPress={fetchGreeting}>
        <Text style={{ fontSize: 18, marginVertical: 10 }}>GET api/greeting</Text>
      </Pressable>
      <Pressable onPress={postGreeting}>
        <Text style={{ fontSize: 18 }}>POST api/greeting</Text>
      </Pressable>
      <Text>MY_VALUE: {process.env.MY_VALUE}</Text>
      <Text>EXPO_PUBLIC_VALUE: {process.env.EXPO_PUBLIC_VALUE}</Text>
    </View>
  );
};

export default Feed;
