import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  buttonContainer: {
    alignItems: 'center',

    height: 68,
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 3,
    width: 320
  },
  buttonIcon: {
    paddingRight: 8
  },
  buttonLabel: {
    color: Colors.light.darkGray,
    fontSize: 16
  }
});

export default styles;
