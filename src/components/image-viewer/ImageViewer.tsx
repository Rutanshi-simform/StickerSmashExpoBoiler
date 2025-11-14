import { Image } from 'expo-image';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styles from './ImageViewerStyles';

interface Props {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
}

/**
 *
 * @param param0
 * @returns
 */
export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
  return <Image source={imageSource} style={styles.image} />;
}
