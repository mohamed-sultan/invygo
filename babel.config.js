module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@pages': './src/components/pages',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@navigation': './src/navigation',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          "@interfaces": './src/interfaces',
          '@hoc': './src/hoc'

        },
      },
    ],
  ],
};
