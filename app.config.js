import { defineProGuardRules, getEnvironmentConfig } from './buildconfig';

/* eslint-disable require-jsdoc */
const defineConfig = ({ config }) => {
  let APP_ENV = process.env.NODE_ENV;

  const { appName, bundleIdentifier } = getEnvironmentConfig(APP_ENV);

  return {
    ...config,
    name: appName,
    slug: 'stickersmashexpoboiler',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './app/assets/icons/appIcon.png',
    scheme: 'StickerSmashExpoBoiler',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './app/assets/images/splashScreen.png',
      resizeMode: 'contain'
    },
    ios: {
      bundleIdentifier: bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCameraUsageDescription: 'This app requires to access your photo library'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './app/assets/icons/adaptiveIcon.png',
        backgroundColor: '#ffffff'
      },
      package: bundleIdentifier,
      permissions: ['CAMERA']
    },
    web: {
      bundler: 'metro',
      output: 'static'
    },
    plugins: [
      'expo-localization',
      'expo-asset',
      'expo-font',
      'expo-router',
      [
        'expo-build-properties',
        {
          android: {
            minSdkVersion: 30,
            enableProguardInReleaseBuilds: true,
            extraProguardRules: defineProGuardRules(bundleIdentifier)
          },
          ios: {
            deploymentTarget: '16.0'
          }
        }
      ],
      [
        'react-native-permissions',
        {
          iosPermissions: ['Camera']
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: 'f3048f2c-4e9c-4277-bfbb-b6f4f98645f7'
      }
    }
  };
};

export default defineConfig;
