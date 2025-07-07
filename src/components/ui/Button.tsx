import React, {useState} from 'react';
import {Pressable, Text, PressableProps, View, GestureResponderEvent, StyleSheet} from 'react-native';
import {twMerge} from 'tailwind-merge';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '@components/ui/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ButtonProps = {
  label?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  onPress?: (event: GestureResponderEvent) => void | Promise<void>;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  icon? : string; // Icon to be displayed on the button
  iconPosition?: 'left' | 'right';
  iconColor?: string; 
} & PressableProps;

const Button: React.FC<ButtonProps> = ({children, onPress, className, textClassName, disabled, label, iconColor = '#fff', position = 'right' , icon , iconPosition = 'left',...props}) => {
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
      className={twMerge('bg-theme border-theme overflow-hidden p-2 py-3 rounded-lg flex-row gap-2 items-center justify-center', isDisabled && 'opacity-50', className)}
      style={{borderWidth: 1}}
      {...props}>
      <LinearGradient colors={['rgba(255, 255, 255, 0.317)', 'transparent']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.5}} style={StyleSheet.absoluteFillObject} />

        {/* Extra children (e.g. countdown, badge) */}
        { position === 'left' && children && (
          <View style={{display: !isLoading ? 'flex' : 'none'}} className="mx-2 flex-row items-center">{children}</View>
        )}

        {/* Icon */}
        {!isLoading && icon && iconPosition === 'left' && (
          <Icon size={20} color={iconColor} name={icon} ></Icon>
        )}

        {/* Label or Loader */}
        {isLoading ? (
          <Loader />
        ) : (
          !!label && (
            <Text className={twMerge('text-white font-interBold text-center', textClassName)}>
              {label}
            </Text>
          )
        )}

        {!isLoading && icon && iconPosition === 'right' && (
          <Icon size={20} color="#fff" name={icon} ></Icon>
        )}

        {/* Extra children (e.g. countdown, badge) */}
        { position === 'right' && children && (
          <View style={{display: !isLoading ? 'flex' : 'none'}} className="mx-2 flex-row items-center">{children}</View>
        )}
    </Pressable>
  );
};

export default Button;
