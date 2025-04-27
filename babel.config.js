module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove any expo-router related plugins
      'react-native-reanimated/plugin',
    ],
  };
}; 