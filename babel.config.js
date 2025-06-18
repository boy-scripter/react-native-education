module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env.development',
        blocklist: null,
        allowlist: null,
        blacklist: null, // DEPRECATED
        whitelist: null, // DEPRECATED
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.ios.js', '.android.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ttf', '.woff', '.woff2', '.eot', '.otf'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constant': './src/constant',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
          '@animation': './src/animation',
          '@store': './src/store',
          '@myTypes': './src/types',
        },
      },
    ],
  ],
};
