const withAndroidPlugin = require('./withAndroidPlugin.js');
const withIosPlugin = require('./withIosPlugin');

/**
 * Custom Expo config plugin
 * @param config Expo config object
 * @returns Modified config object
 */
const withPlugin = (config, props = {}) => {
  // Apply Android modifications first
  config = withAndroidPlugin(config, props);
  //   // Then apply iOS modifications and return
  return withIosPlugin(config, props);
};

module.exports = withPlugin;
