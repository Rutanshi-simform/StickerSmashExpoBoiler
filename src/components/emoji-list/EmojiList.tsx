import { Image } from 'expo-image';
import React, { useState } from 'react';
import { FlatList, ImageSourcePropType, Platform, Pressable } from 'react-native';
import { Images } from '../../assets';
import styles from './EmojiListStyles';

interface Props {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
}

/**
 *
 * @param param0
 * @returns
 */
export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSourcePropType[]>([
    Images.Emoji1,
    Images.Emoji2,
    Images.Emoji3,
    Images.Emoji4,
    Images.Emoji5,
    Images.Emoji6
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}
