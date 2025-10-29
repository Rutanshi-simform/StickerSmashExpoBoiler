import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  circleButton: {
    alignItems: 'center',
    backgroundColor: Colors.light.white,
    borderRadius: 42,
    flex: 1,
    justifyContent: 'center'
  },
  circleButtonContainer: {
    borderColor: Colors.light.yellow,
    borderRadius: 42,
    borderWidth: 4,
    height: 84,
    marginHorizontal: 60,
    padding: 3,
    width: 84
  }
});

export default styles;
