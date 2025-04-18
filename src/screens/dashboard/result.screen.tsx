import Button from '@components/ui/Button';
import colorConstant from '@constant/color.constant';
import {navigate} from '@hooks/useNavigation.hook';
import React, {useEffect} from 'react';
import {View, Text, Share} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming, interpolate, interpolateColor} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {twMerge} from 'tailwind-merge';

const ResultScreen: React.FC = () => {
  const buttons = [
    {label: 'Play Again', icon: 'reload', action: () => console.log('Play Again')},
    {label: 'Home', icon: 'home', action: () => navigate('home')},
    {label: 'Share', icon: 'share-variant', action: () => Share.share({message: 'Check out my quiz results!'})},
    {label: 'See PDF', icon: 'file-pdf-box', action: () => console.log('See PDF')},
  ];

  return (
    <View className="flex-1 py-5 px-5 items-center">
      <View className="flex-1">
        {/* circle */}
        <View className="flex w-full items-center">
          <RippleEffect color={colorConstant.greyish[200]} className="rounded-full">
            <View className="w-44 h-44 mx-auto rounded-full bg-theme items-center justify-center">
              <Text className="text-lg text-white font-interBold">Your Score</Text>
              <Text className="text-3xl text-white font-interBold">85</Text>
              <Text className=" text-white font-interBold">points</Text>
            </View>
          </RippleEffect>
        </View>
        {/* circle end */}

        {/* box information start */}
        <View style={{elevation: 14}} className="flex rounded-xl flex-wrap bg-white shadow-slate-300 flex-row justify-between w-full px-2 py-4 gap-2 mt-12">
          <View className="w-[48%] py-5 items-center justify-center ">
            <Text className="text-lg font-interBold">Correct</Text>
            <Text className="text-2xl font-interBold">15</Text>
          </View>
          <View className="w-[48%] py-5  items-center justify-center ">
            <Text className="text-lg font-interBold">Incorrect</Text>
            <Text className="text-2xl font-interBold">5</Text>
          </View>
          <View className="w-[48%] py-5 items-center justify-center ">
            <Text className="text-lg font-interBold">Skipped</Text>
            <Text className="text-2xl font-interBold">3</Text>
          </View>
          <View className="w-[48%] py-5 items-center justify-center ">
            <Text className="text-lg font-interBold">Total</Text>
            <Text className="text-2xl font-interBold">23</Text>
          </View>
        </View>
        {/* box information end */}

        {/* btns */}
        <View className="mt-12 flex-wrap flex-row justify-between">
          {buttons.map((button, index) => (
            <View key={index} className="w-[48%] mb-4">
              <Button label={button.label} onPress={button.action}>
                <Icon name={button.icon} size={20} color="white" />
              </Button>
            </View>
          ))}
        </View>
        {/* btns end */}
      </View>
    </View>
  );
};
export default ResultScreen;

export interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  color: string;
  duration?: number;
}

const RippleEffect = ({children, className, color, duration = 1000}: RippleEffectProps) => {
  const rippleOpacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(rippleOpacity.value, [1, 0], [30, 500]);
    const backgroundColor = interpolateColor(rippleOpacity.value, [1, 0], [color, color + '00']);

    return {
      backgroundColor,
      padding: scale,
    };
  });

  useEffect(() => {
    setInterval(() => {
      rippleOpacity.set(1);
      rippleOpacity.value = withTiming(0, {duration: duration * 2.5});
    }, duration);
  }, []);

  return (
    <View className="relative">
      {children}
      <Animated.View style={animatedStyle} className={twMerge('absolute z-10 h-full aspect-square',className)}></Animated.View>
    </View>
  );
};
