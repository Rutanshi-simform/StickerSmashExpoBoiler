import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.light.darkGray,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    bottom: 0,
    height: '25%',
    position: 'absolute',
    width: '100%'
  },
  title: {
    color: Colors.light.white,
    fontSize: 16
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: Colors.light.lightGray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    height: '16%',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
});

export default styles;
