import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RippleEffect from '@animation/RippleEffect';
import colorConstant from '@constant/color.constant';

const ScoreCircle: React.FC<{score: number}> = ({score}) => (
  <View className="items-center mb-8">
    <RippleEffect count={5} color={colorConstant.greyish[200]} className="rounded-full">
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 8},
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 20,
        }}
        className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center">
        <View className="absolute inset-2 rounded-full bg-white/10" />
        <Text className="text-sm text-white font-interBold opacity-90 mb-1">Your Score</Text>
        <Text className="text-4xl text-white font-interBold">{score}</Text>
        <Text className="text-sm text-white font-interBold opacity-90">points</Text>
        <View className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full items-center justify-center">
          <Icon name="star" size={20} color="#f59e0b" />
        </View>
      </View>
    </RippleEffect>
  </View>
);

export default ScoreCircle;
