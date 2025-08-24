import LottieView from 'lottie-react-native';
import React from 'react';
import {View, Text} from 'react-native';
import loaderAnimation from '@assets/lottie/joystick.json';

const JoyStickLoader = ({message = 'Loading ...', fullScreen = false}) => {
  return (
    <View className={`${fullScreen ? 'absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 z-50 flex items-center justify-center' : 'flex items-center justify-center'}`}>
      <LottieView speed={0.6} source={loaderAnimation} autoPlay loop resizeMode="cover" style={{width: 300, height: 300}}  />
      <Text className="mt-4 text-2xl text-gray-600">{message}</Text>
    </View>
  );
};

export {JoyStickLoader};
