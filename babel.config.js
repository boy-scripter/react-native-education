const extensions = [
  '.ts', '.tsx', '.js', '.jsx', '.json', 
  '.ios.js', '.android.js', 
  '.png', '.jpg', '.jpeg', '.gif', '.svg', 
  '.ttf', '.woff', '.woff2', '.eot', '.otf'
];

module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions, // Spread the array here
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constant': './src/constant',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
