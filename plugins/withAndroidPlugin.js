const { withAndroidManifest } = require('@expo/config-plugins');

/**
 *
 * @param config
 * @returns
 */
const withAndroidPlugin = (config, props) => {
  // Define a custom message

  const message = props.message || 'Hello world, from Expo plugin!';
  return withAndroidManifest(config, (androidConfig) => {
    const mainApplication = androidConfig?.modResults?.manifest?.application?.[0];

    if (mainApplication) {
      // Ensure meta-data array exists
      if (!mainApplication['meta-data']) {
        mainApplication['meta-data'] = [];
      }

      // Add the custom message as a meta-data entry
      mainApplication['meta-data'].push({
        $: {
          'android:name': 'HelloWorldMessage',
          'android:value': message
        }
      });
    }

    return androidConfig;
  });
};

module.exports = withAndroidPlugin;
