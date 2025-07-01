import React, {useState} from 'react';
import {Pressable, Text, PressableProps, View, GestureResponderEvent, StyleSheet} from 'react-native';
import {twMerge} from 'tailwind-merge';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '@components/ui/Loader';
import colorConstant from '@constant/color.constant';

type ButtonProps = {
  label: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  onPress?: (event: GestureResponderEvent) => void | Promise<void>;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
} & PressableProps;

const theme = {
  default: {
    btn: colorConstant.theme.DEFAULT,
    loader: colorConstant.greyish[100],
  },
  white: {
    btn: colorConstant.greyish,
    loader: colorConstant.theme.DEFAULT,
  },
};

const Button: React.FC<ButtonProps> = ({children, position = 'left', onPress, className, textClassName, disabled, label, ...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || disabled;

  const handlePress = async (event: GestureResponderEvent) => {
    if (!onPress) return;

    const result = onPress(event);

    // Check if result is a Promise
    if (result && typeof result.then === 'function') {
      try {
        setIsLoading(true);
        await result;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      className={twMerge('bg-theme border-theme overflow-hidden p-2 py-3 rounded-lg flex-row items-center justify-center', isDisabled && 'opacity-50', className)}
      style={{borderWidth: 1}}
      {...props}>
      <LinearGradient colors={['rgba(255, 255, 255, 0.317)', 'transparent']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.5}} style={StyleSheet.absoluteFillObject} />

      {isLoading ? (
        <Loader />
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
