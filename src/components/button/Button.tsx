import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Colors } from '../../theme';
import styles from './ButtonStyles';

interface Props {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
}

/**
 *
 * @param param0
 * @returns
 */
export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          { borderColor: Colors.light.yellow, borderRadius: 18, borderWidth: 4 }
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: Colors.light.white }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color={Colors.light.darkGray}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={[styles.buttonLabel, { color: Colors.light.white }]}>{label}</Text>
      </Pressable>
    </View>
  );
}
