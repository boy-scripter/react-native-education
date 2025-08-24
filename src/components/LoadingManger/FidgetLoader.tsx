import React from 'react';
import {View, Text, Image} from 'react-native';

const FidgetLoader = ({message = 'Loading ...', fullScreen = false}) => {
  return (
    <View className={`${fullScreen ? 'absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 z-50 flex items-center justify-center' : 'flex items-center justify-center'}`}>
      <Image source={require('@/assets/gif/fidget.gif')} className="w-16" resizeMode="contain" />
      <Text className="mt-4 text-lg text-gray-600">{message}</Text>
    </View>
  );
};

export default FidgetLoader;
