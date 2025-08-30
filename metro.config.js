const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

// Extend sourceExts to include svg (TypeScript files are already included by default)
defaultConfig.resolver.sourceExts.push('svg');

const config = mergeConfig(defaultConfig, {
  // Any other extra config you need
});
module.exports = withNativeWind(config, {input: './global.css'});
