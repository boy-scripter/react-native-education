import React from 'react';
import {Pressable, Text, PressableProps, View, GestureResponderEvent} from 'react-native';
import {twMerge} from 'tailwind-merge';

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
      className={twMerge('bg-theme border-theme p-3 rounded-lg flex-row items-center justify-center', disabled && 'opacity-50', className)}
      style={{borderWidth: 1}}>
      {position === 'left' && children && <View className="mr-2">{children}</View>}
      <Text className={twMerge('text-white text-center', textClassName)}>{label}</Text>
      {position === 'right' && children && <View className="ml-2">{children}</View>}
    </Pressable>
  );
};

export default Button;
