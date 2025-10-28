import React, { type FC } from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import styleSheet from './HomeStyles';

/**
 * The HomeScreen component with two buttons for navigation respected screen.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);

  return (
    <View style={styles.screenView}>
      <Text style={styles.textView}>{Strings.Home.homeScreenTitle}</Text>
    </View>
  );
};

export default HomeScreen;
