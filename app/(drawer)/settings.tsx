import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MyModule from '../../modules/my-module';
import { CustomHeader } from '../../src/components';
import { Colors, scale } from '../../src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: scale(16)
  },
  section: {
    marginBottom: scale(24)
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: '600',
    marginBottom: scale(16)
  },
  themeContainer: {
    borderRadius: scale(12),
    borderWidth: 1,
    elevation: 2,
    padding: scale(16),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  themeIcon: {
    marginRight: scale(12)
  },
  themeInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: scale(16)
  },
  themeLabel: {
    fontSize: scale(14),
    marginBottom: scale(4)
  },
  themeValue: {
    fontSize: scale(16),
    fontWeight: '600'
  },
  toggleButton: {
    alignItems: 'center',
    borderRadius: scale(8),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12)
  },
  toggleButtonText: {
    fontSize: scale(16),
    fontWeight: '600'
  }
});

/**
 * Settings Screen Component
 *
 * Allows users to toggle between light and dark themes using native module.
 * Theme changes are persisted and reflected across all screens via event listener.
 *
 * @returns JSX.Element
 */
const Settings = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState<string>(() => MyModule.getTheme());

  // Listen to theme changes from native module
  useEffect(() => {
    const subscription = MyModule.addListener('onChangeTheme', (event: { theme: string }) => {
      setTheme(event.theme);
    });

    return () => subscription.remove();
  }, []);

  const isDark = theme === 'dark';
  const currentTheme = (theme === 'system' ? 'light' : theme) as 'light' | 'dark';

  /**
   * Toggle between dark and light theme
   */
  const handleToggleTheme = useCallback(() => {
    const nextTheme = isDark ? 'light' : 'dark';
    MyModule.setTheme(nextTheme);
  }, [isDark]);

  /**
   * Open navigation drawer
   */
  const handleOpenDrawer = useCallback(() => {
    // @ts-ignore - Expo Router drawer navigation
    navigation.openDrawer();
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: Colors[currentTheme]?.white }]}>
      <CustomHeader
        title={'Settings'}
        customLeftView={
          <MaterialIcons
            name="menu"
            size={30}
            color={Colors[currentTheme]?.black}
            onPress={handleOpenDrawer}
          />
        }
      />

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[currentTheme]?.black }]}>
            Appearance
          </Text>

          <View
            style={[
              styles.themeContainer,
              {
                backgroundColor: Colors[currentTheme]?.white,
                borderColor: Colors[currentTheme]?.gray,
                shadowColor: Colors[currentTheme]?.black
              }
            ]}
          >
            <View style={styles.themeInfo}>
              <MaterialIcons
                name={isDark ? 'dark-mode' : 'light-mode'}
                size={24}
                color={Colors[currentTheme]?.black}
                style={styles.themeIcon}
              />
              <View>
                <Text style={[styles.themeLabel, { color: Colors[currentTheme]?.gray }]}>
                  Theme
                </Text>
                <Text style={[styles.themeValue, { color: Colors[currentTheme]?.black }]}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
            </View>

            <Pressable
              accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              accessibilityRole="button"
              style={[styles.toggleButton, { backgroundColor: Colors[currentTheme]?.black }]}
              onPress={handleToggleTheme}
            >
              <Text style={[styles.toggleButtonText, { color: Colors[currentTheme]?.white }]}>
                {isDark ? 'Switch to Light' : 'Switch to Dark'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;
