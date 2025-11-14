const { withInfoPlist } = require('@expo/config-plugins');

/**
 *
 * @param config
 * @returns
 */
const withIosPlugin = (config, props) => {
  // Define the custom message
  const message = props.message || 'Hello world, from Expo plugin!';

  return withInfoPlist(config, (iosConfig) => {
    // Add the custom message to the Info.plist file
    iosConfig.modResults.HelloWorldMessage = message;
    return iosConfig;
  });
};

module.exports = withIosPlugin;
