import {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {useAnimatedStyle, SharedValue, useSharedValue, withTiming, interpolate, interpolateColor, withRepeat, withDelay} from 'react-native-reanimated';
import {twMerge} from 'tailwind-merge';

type RippleEffectProps = {
  children: React.ReactNode;
  className?: string;
  color: string;
  count?: number;
  duration?: number;
};

const RippleEffect = ({children, className, color, count = 3, duration = 2500}: RippleEffectProps) => {
  // Create an array of shared values, one for each ripple
  const ripples = Array.from({length: count}, () => useSharedValue(1));

  useEffect(() => {
    ripples.forEach((ripple, i) => {
      ripple.value = withDelay(
        i * (duration / count), // slight stagger per ripple
        withRepeat(
          withTiming(0, {duration}),
          -1, // loop infinitely
          false, // no reverse
        ),
      );
    });
  }, []);

  const animatedStyle = (ripple: SharedValue<number>, delayFactor: number) =>
    useAnimatedStyle(() => {
      const scale = interpolate(ripple.value, [1, 0], [1, 1.7]);
      const backgroundColor = interpolateColor(ripple.value, [1, 0], [color, color + '00']);

      return {
        backgroundColor,
        transform: [{scale}],
      };
    });

  return (
    <View className="relative">
      {children}
      {ripples.map((ripple, i) => (
        <Animated.View
          key={i}
          style={animatedStyle(ripple, 0.3 + i * 0.3)} // staggered scale
          className={twMerge('absolute -z-10 h-full aspect-square', className)}
        />
      ))}
    </View>
  );
};

export default RippleEffect;
