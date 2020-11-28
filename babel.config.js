module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@context': './src/context',
          '@styles': './src/styles',
          '@types': './src/types',
          '@utils': './src/utils',
          '@routes': './src/routes',
          '@ui': './src/ui',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};
