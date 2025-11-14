import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { Pressable } from 'react-native';
import styles from './CustomDrawerStyles';
import { Images } from '../assets';
import { useState } from 'react';
import CustomModal, { showModal } from '../components/customModal/CustomModal';

const CustomDrawer = (props: any) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  return (
    <DrawerContentScrollView {...props}>
      <Pressable style={styles.imageContainer} onPress={showModal}>
        <Image
          source={selectedImage ? { uri: selectedImage } : Images.Avatar}
          style={styles.image}
          contentFit="cover"
        />
      </Pressable>
      <DrawerItemList {...props} />
      <CustomModal setSelectedImage={setSelectedImage} />
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;
