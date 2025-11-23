module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-loader-kit|react-native-mmkv|react-native-screens|react-native-safe-area-context|react-native-gesture-handler|@react-native-masked-view|react-native-linear-gradient|react-native-skeleton-placeholder|react-native-nitro-modules|lottie-react-native)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
