import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { CustomHeader } from '../../src/components';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ProductData } from '../../src/constants';
import { Image } from 'expo-image';
/**
 * ProductDetails Screen
 * Displays details for a specific product based on productId
 */
const ProductDetails = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const product = ProductData.find((product) => product.id === productId);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Product Details"
        customLeftView={
          <MaterialIcons name="arrow-back" size={30} color="black" onPress={navigation.goBack} />
        }
      />
      <View style={styles.content}>
        <Image
          source={product?.imageSource}
          style={{ width: '100%', height: '60%', borderRadius: 5 }}
          contentFit="cover"
        />
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.subtitle}>$ {product?.price}.00</Text>
        <Text style={styles.subtitle}>{product?.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666'
  }
});

export default ProductDetails;
