import { StyleSheet } from 'react-native';
import { Colors } from '../theme';

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.light.secondary
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 50,
    marginVertical: 20
  }
});

export default styles;
