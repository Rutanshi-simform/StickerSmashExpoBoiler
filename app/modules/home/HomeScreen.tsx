import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState, type FC } from 'react';
import { Alert, ImageSourcePropType, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { Images } from '../../assets';
import {
  Button,
  CircleButton,
  EmojiList,
  EmojiPicker,
  EmojiSticker,
  IconButton,
  ImageViewer,
  Text
} from '../../components';
import { Colors } from '../../theme';
import styles from './HomeStyles';

/**
 * The HomeScreen component with two buttons for navigation respected screen.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = (): React.ReactElement => {
  const imageRef = useRef<View>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   */
  const onReset = () => {
    setShowAppOptions(false);
  };

  /**
   *
   */
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  /**
   *
   */
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  /**
   *
   */
  const onSaveImageAsync = async () => {
    const localUri = await captureRef(imageRef, {
      height: 440,
      quality: 1
    });

    await MediaLibrary.saveToLibraryAsync(localUri);
    if (localUri) {
      Alert.alert('Saved!');
    }
  };

  /**
   *
   */
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <Text style={{ color: Colors.light.white }}>Changes from dev</Text>
          <ImageViewer imgSource={Images.PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="select a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
};

export default HomeScreen;
