import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import styles from './EmojiPickerStyles';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

/**
 *
 * @param param0
 * @returns
 */
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <View>
      <Modal transparent animationType="slide" visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          {children}
        </View>
      </Modal>
    </View>
  );
}
