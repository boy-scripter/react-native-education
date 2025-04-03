import React from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';

export function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <View className="flex-1 bg-theme-900 ">
      <ImageBackground className="h-[150px]  flex gap-3 justify-end py-5 px-5" source={require('@assets/images/star.png')}>
        <Text className="font-interBold text-white text-3xl">Get Started now</Text>
        <Text className="text-white font-inter text-xs">Create an account or log in to explore about our app</Text>
      </ImageBackground>

      <View style={{borderTopRightRadius: 20, borderTopLeftRadius: 20}} className="bg-white rounded-t-2xl flex-1 p-5">
        {children}
      </View>
    </View>
  );
}
