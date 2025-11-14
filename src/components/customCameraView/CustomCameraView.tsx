import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { CameraView, CameraType } from 'expo-camera';

interface CustomCameraViewProps {
  onClose: () => void;
  onPhotoTaken: (uri: string) => void;
}

const CustomCameraView: React.FC<CustomCameraViewProps> = ({ onClose, onPhotoTaken }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
          exif: false
        });

        if (photo?.uri) {
          onPhotoTaken(photo.uri);
        }
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 32,
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default CustomCameraView;
