import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

/**
 * A StyleSheet object that contains all of the home screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.light.darkGray,
    flex: 1
  },
  footerContainer: {
    alignItems: 'center',
    flex: 1 / 3
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28
  },
  optionsContainer: {
    bottom: 80,
    position: 'absolute'
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  screenView: {
    backgroundColor: Colors.light.white,
    flex: 1
  },
  textView: {
    color: Colors.light.black
  }
});

export default styles;
