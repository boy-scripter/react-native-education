import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const QuizScreen: React.FC = () => {
  return (
    <View className="p-5 justify-center items-center">
      <View className="flex-row gap-6 mt-5 px-2 items-center ">
        <Icon name="x" color="black" size={16} className="border-greyish-100 border status font-interBold p-1 px-2 rounded-full" />
        <View className="p-3 px-4 border flex-row items-center gap-2 border-greyish-100 rounded-3xl flex-1">
          <View className="bg-theme-900 rounded-xl p-1.5  flex-1"></View>
          <Text className="text-greyish-100 font-interBold">5/10</Text>
        </View>
      </View>

      <View className="w-full mt-24 rounded-2xl bg-white min-h-72 p-8" style={{elevation: 14}}>
        <CustomCircle className="mx-auto -mt-20 mb-5" />

        <Text className="font-interBold text-2xl text-theme-900 ">What is the most Poppular game thoughtout the world ?</Text>
      </View>

      <View className="options w-full">
        <View></View>
      </View>
    </View>
  );
};

export default QuizScreen;

import LinearGradient from 'react-native-linear-gradient';
import {twMerge} from 'tailwind-merge';

export function CustomCircle({className}: {className: string}) {
  return (
    <View style={{elevation: 10}} className={twMerge('p-2 rounded-full shadow-slate-200 bg-white aspect-square overflow-hidden w-28', className)}>
      <View className="w-full relative h-full rounded-full overflow-hidden">
        <View className="absolute w-full h-full rounded-full z-0">
          <LinearGradient
            colors={['#0F172A', '#94A3B8']} 
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="w-full h-full rounded-full"
            style={{
              position: 'absolute',
            }}
          />
        </View>

        {/* Inner White Circle */}
        <View className="bg-white rounded-full flex justify-center items-center w-full h-full p-2 z-10">
          <Text className="font-interBold text-xl">30</Text>
        </View>
      </View>
    </View>
  );
}
