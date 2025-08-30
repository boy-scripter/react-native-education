import React from 'react';
import {View} from 'react-native';
import Animated, {useAnimatedProps, SharedValue} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: SharedValue<number>;
  fillColor: string;
  backgroundColor?: string;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  fillColor,
  backgroundColor = '#e5e7eb',
  shadowColor = '#000000',
  shadowOpacity = 0.15,
  shadowRadius = 8,
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value / 100),
  }));

  return (
    <View className="items-center justify-center">
      {/* Main container with shadow */}
      <View
        className="bg-white rounded-full items-center justify-center"
        style={{
          width: size + 20,
          height: size + 20,
          shadowColor: shadowColor,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: shadowOpacity,
          shadowRadius: shadowRadius,
          elevation: 12,
        }}>
        <Svg width={size} height={size}>
          <Circle cx={size / 2} cy={size / 2} r={radius} stroke={backgroundColor} strokeWidth={strokeWidth} fill="transparent" />

          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={fillColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${circumference}`}
            strokeLinecap="round"
            animatedProps={animatedProps}
            transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
          />
        </Svg>
      </View>
    </View>
  );
};
