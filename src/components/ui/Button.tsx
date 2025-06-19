import React, {useState} from 'react';
import {Pressable, Text, PressableProps, View, GestureResponderEvent, StyleSheet} from 'react-native';
import {twMerge} from 'tailwind-merge';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '@components/ui/Loader';

type ButtonProps = {
  label: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  asyncCall: () => Promise<void>;
} & PressableProps;

const Button: React.FC<ButtonProps> = ({children, position = 'left', onPress, asyncCall, className, textClassName, disabled, label}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || disabled;

  const handlePress = async (event: GestureResponderEvent) => {
    if (asyncCall != undefined) {
      try {
        setIsLoading(true);
        await asyncCall();
      } finally {
        setIsLoading(false);
      }
    } else if (onPress) {
      onPress(event);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      className={twMerge('bg-theme overflow-hidden border-theme p-2 py-3 rounded-lg flex-row items-center justify-center', isDisabled && 'opacity-50', className)}
      style={{borderWidth: 1}}>
      <LinearGradient colors={['rgba(255, 255, 255, 0.317)', 'transparent']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.5}} style={StyleSheet.absoluteFillObject} />

      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          {position === 'left' && children && <View className="mr-2">{children}</View>}
          <Text className={twMerge('text-white font-interBold text-center', textClassName)}>{label}</Text>
          {position === 'right' && children && <View className="ml-2">{children}</View>}
        </>
      )}
    </Pressable>
  );
};

export default Button;
