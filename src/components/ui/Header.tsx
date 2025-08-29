import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {canGoBack, goBack} from '@/hooks';
import colorConstant from '@/constant/color.constant';

const Header = ({message}: {message: string}) => {
  return (
    <>
      {/* Floating Back Button */}
      { canGoBack() &&(
        <View onTouchEnd={goBack} className="absolute border z-10 top-5 left-5 rounded-full bg-white  p-2">
          <AntDesign name="arrowleft" size={24} color={colorConstant.theme.DEFAULT} />
        </View>
      )}

      {/* Header with Rounded Bottom */}
      <View
        className="pt-6 pb-6 px-6 bg-gray-200"
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <View className="flex-row items-center justify-center">
          <View className="items-center">
            <Text className="text-xl text-center font-bold text-gray-800">{message}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export {Header};
