import { Image } from 'expo-image';
import React from 'react';
import { ImageSourcePropType, View } from 'react-native';

interface Props {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}

/**
 *
 * @param param0
 * @returns
 */
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}
