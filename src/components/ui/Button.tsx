import React, {useState} from 'react';
import {Pressable, Text, PressableProps, View, GestureResponderEvent, StyleSheet} from 'react-native';
import {twMerge} from 'tailwind-merge';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '@components/ui/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type ButtonProps = {
  label?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  onPress?: (event: GestureResponderEvent) => void | Promise<void>;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  icon?: string; // Icon to be displayed on the button
  iconPosition?: 'left' | 'right';
  iconColor?: string;
  iconSize?: number;
  loadingMode?: boolean;
} & PressableProps;

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  className,
  textClassName,
  disabled,
  label,
  loadingMode = true,
  iconSize = 20,
  icon,
  iconColor = '#fff',
  position = 'right',
  iconPosition = 'left',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = isLoading || disabled;

  const handlePress = async (event: GestureResponderEvent) => {
    if (!onPress) return;

    const result = onPress(event);

    // Check if result is a Promise
    if (result && loadingMode && typeof result.then === 'function') {
      try {
        setIsLoading(true);
        await result;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isLabel = !!label ;

  const LeftContent = () => (
    <View className="flex-row items-center gap-2">
      {icon && iconPosition === 'left' && !isLoading && <Icon name={icon} size={iconSize} color={iconColor} />}
      <View style={{display: isLoading ? 'none' : 'flex'}}>{position === 'left' && children}</View>
    </View>
  );

  const RightContent = () => (
    <View className="flex-row items-center gap-2">
      <View style={{display: isLoading ? 'none' : 'flex'}}>{position === 'right' && children}</View>
      {icon && iconPosition === 'right' && !isLoading && <Icon name={icon} size={iconSize} color={iconColor} />}
    </View>
  );

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      className={twMerge('bg-theme border-theme overflow-hidden p-2 py-3  rounded-lg flex-row gap-2 items-center justify-center', isDisabled && 'opacity-50', className)}
      style={{borderWidth: 1}}
      {...props}>
      <LinearGradient colors={['rgba(255, 255, 255, 0.317)', 'transparent']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.5}} style={StyleSheet.absoluteFillObject} />

  {/* Extra children (e.g. countdown, badge) */}
      {position === 'left' && children && (
        <View style={{display: !isLoading ? 'flex' : 'none'}} className=" flex-row items-center">
          {children}
        </View>
      )}

      {/* Icon */}
      {!isLoading && icon && iconPosition === 'left' && <Icon size={iconSize} color={iconColor}  name={icon}></Icon>}

      {/* Label or Loader */}
      {isLoading ? <Loader /> : isLabel && <Text className={twMerge('text-white font-interBold text-center', textClassName)}>{label}</Text>}

      {/* Icon */}
      {!isLoading && icon && iconPosition === 'right' && <Icon size={iconSize} color="#fff"  name={icon}></Icon>}

      {/* Extra children (e.g. countdown, badge) */}
      {position === 'right' && children && (
        <View style={{display: !isLoading ? 'flex' : 'none'}} className=" flex-row items-center">
          {children}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
