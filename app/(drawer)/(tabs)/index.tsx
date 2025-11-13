import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomHeader } from '../../../src/components';
import { ProductData } from '../../../src/constants';
import { Image } from 'expo-image';

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

  const RenderItem = ({ item }: any) => {
    return (
      <Pressable style={{ borderWidth: 1, borderRadius: 5, marginBottom: 10 }}>
        <Image
          source={item.imageSource}
          style={{ width: 'auto', height: 200, borderRadius: 5 }}
          contentFit="cover"
        />
        <Text
          style={{ paddingHorizontal: 20, marginVertical: 10, fontSize: 18, fontWeight: 'bold' }}
        >
          {item.name}
        </Text>
        <Text style={{ paddingHorizontal: 20 }}>$ {item.price}.00</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <Link
            key={item.id}
            style={{
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            href={`/products/${item.id}`}
          >
            View Details
          </Link>
          <Pressable
            style={{
              borderRadius: 5,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text>Add to Cart</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Home"
        customLeftView={
          <MaterialIcons name="menu" size={30} color="black" onPress={handleOpenDrawer} />
        }
      />
      <FlatList
        data={ProductData}
        renderItem={RenderItem}
        style={{ marginTop: 10, marginHorizontal: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Home;
