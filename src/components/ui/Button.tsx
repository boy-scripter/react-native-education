import React, {useState} from 'react';
import {Pressable, Text, GestureResponderEvent, View, StyleSheet, PressableProps} from 'react-native';
import {twMerge} from 'tailwind-merge';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '@components/ui/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {match, P} from 'ts-pattern';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

const Button: React.FC<ButtonProps> = React.memo(
  ({children, onPress, className, textClassName, disabled, label, icon, iconSize = 20, loadingMode = true, iconColor = '#fff', position = 'right', iconPosition = 'left', ...props}) => {
    const [isLoading, setIsLoading] = useState(false);
    const isDisabled = isLoading || disabled;

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{scale: scale.value}],
      opacity: isDisabled ? 0.5 : 1,
    }));

    console.log(disabled)

    const handlePress = async (event: GestureResponderEvent) => {
      if (!onPress) return;
      scale.value = withSpring(0.96, {}, () => {
        scale.value = withSpring(1);
      });

      const result = onPress(event);
      if (result && loadingMode && typeof result.then === 'function') {
        try {
          setIsLoading(true);
          await result;
        } finally {
          setIsLoading(false);
        }
      }
    };
    const renderIcon = () =>
      match([icon, isLoading] as const)
        .with([P.string, false], ([iconName]) => <Icon name={iconName} size={iconSize} color={iconColor} />)
        .otherwise(() => null);

    const renderChildren = () =>
      match(isLoading)
        .with(false, () => <View className="flex-row items-center">{children}</View>)
        .otherwise(() => null);

    const renderLabel = () =>
      match([isLoading, label] as const)
        .with([false, P.string], ([, lbl]) => <Text className={twMerge('text-white font-interBold text-center', textClassName)}>{lbl}</Text>)
        .otherwise(() => null);

    const renderLoader = () =>
      match(isLoading)
        .with(true, () => <Loader />)
        .otherwise(() => null);

    return (
      <AnimatedPressable
        onPress={handlePress}
        disabled={isDisabled}
        style={[animatedStyle]}
        className={twMerge('bg-theme border border-theme overflow-hidden p-2 py-3 rounded-lg flex-row items-center justify-center', isDisabled && 'opacity-50', className)}
        {...props}>
        <LinearGradient colors={['rgba(255, 255, 255, 0.317)', 'transparent']} start={{x: 0.5, y: 0}} end={{x: 0.5, y: 0.5}} style={StyleSheet.absoluteFillObject} />
        <View className="flex-row items-center gap-2">
          {iconPosition === 'left' && renderIcon()}
          {position === 'left' && renderChildren()}
          {renderLabel()}
          {position === 'right' && renderChildren()}
          {iconPosition === 'right' && renderIcon()}
        </View>
        {renderLoader()}
      </AnimatedPressable>
    );
  },
);

export default Button;
