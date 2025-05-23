import colorConstant from '@constant/color.constant';
import React, {useEffect} from 'react';
import {Pressable, Text} from 'react-native';
import Animated, {interpolateColor, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

type CheckBoxProps = {
  value?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({value = true, setValue, label}) => {
  const animatedValue = useSharedValue(value ? 1 : 0);

  const animatedStyleView = useAnimatedStyle(() => ({
    borderColor: interpolateColor(value ? 1 : 0, [0, 1], [colorConstant.greyish[200], 'white']),
    backgroundColor: interpolateColor(value ? 1 : 0, [0, 1], ['white', colorConstant.theme.DEFAULT]),
  }));

  // const animatedStyleText = useAnimatedStyle(() => ({
  //   color: interpolateColor(value ? 1 : 0, [0, 1], ['white', 'white']),
  // }));

  useEffect(() => {
    animatedValue.value = value ? 1 : 0;
  }, [value]);

  return (
    <Pressable className="flex-row items-center" onPress={() => setValue && setValue(value => !value)}>
      <Animated.View style={[{borderWidth:1}, animatedStyleView]} className={`p-1 px-2 text-2xl rounded-lg justify-center items-center mr-2`}>
        <Animated.Text className='text-white' style={[{fontSize: 8}]}>✓</Animated.Text>
      </Animated.View>
      {label && <Text>{label}</Text>}
    </Pressable>
  );
};

export default CheckBox;
