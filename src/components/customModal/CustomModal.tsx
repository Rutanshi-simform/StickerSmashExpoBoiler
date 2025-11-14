import { Text, Modal, Alert, Pressable } from 'react-native';
import React, { useImperativeHandle, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './CustomModalStyles';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { CustomCameraView } from '../customCameraView';

const modalRef = React.createRef<any>();

export const showModal = () => modalRef.current?.show();
export const hideModal = () => modalRef.current?.hide();

const CustomModal = ({ setSelectedImage }: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const { bottom } = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();

  useImperativeHandle(modalRef, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      setShowCamera(false); // Unmount camera when closing modal
    }
  }));

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setVisible(false);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  const handleCamera = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (result.granted) {
        setShowCamera(true);
      }
    } else {
      setShowCamera(true);
    }
  };

  const handleCameraClose = () => {
    setShowCamera(false); // Unmount camera when going back
  };

  const handlePhotoTaken = (uri: string) => {
    setSelectedImage(uri);
    setShowCamera(false); // Unmount camera after taking photo
    setVisible(false); // Close modal
  };

  return (
    <Modal
      ref={modalRef}
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={hideModal}
    >
      {showCamera ? (
        <CustomCameraView onClose={handleCameraClose} onPhotoTaken={handlePhotoTaken} />
      ) : (
        <Pressable style={styles.overlay} onPress={hideModal} accessible={false}>
          <Pressable
            style={{ ...styles.content, paddingBottom: bottom }}
            onPress={(e) => e.stopPropagation()}
          >
            <Pressable onPress={pickImageAsync}>
              <Text style={styles.text}>Choose From Gallery</Text>
            </Pressable>
            <Pressable onPress={handleCamera}>
              <Text style={styles.text}>Click a Photo</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      )}
    </Modal>
  );
};

export default CustomModal;
