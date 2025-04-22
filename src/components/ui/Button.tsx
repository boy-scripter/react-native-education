import React from 'react';
import {Pressable, Text, PressableProps, View, GestureResponderEvent, StyleSheet} from 'react-native';
import {twMerge} from 'tailwind-merge';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {

  label: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
} & PressableProps;

const Button: React.FC<ButtonProps> = ({children, onPress, className, textClassName, position = 'left', disabled, label}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={twMerge('bg-theme overflow-hidden border-theme p-2 py-3 rounded-lg flex-row items-center justify-center', disabled && 'opacity-50', className)}
      style={{borderWidth: 1}}>
      <LinearGradient  colors={['rgba(255, 255, 255, 0.317)', 'transparent']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.5}} style={StyleSheet.absoluteFillObject}  />
      {position === 'left' && children && <View className="mr-2">{children}</View>}
      <Text className={twMerge('text-white font-interBold text-center', textClassName)}>{label}</Text>
      {position === 'right' && children && <View className="ml-2">{children}</View>}
    </Pressable>
  );
};

export default Button;
