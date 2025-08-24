import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {twMerge} from 'tailwind-merge';
import CountdownTimer from '@/components/ui/CountDownTimer';
import colorConstant from '@/constant/color.constant';

export type QuestionBoxProps = {
  question: string;
  countdownDuration: number; // dynamic from parent
  innerNumber?: number;
  countdownAutoStart?: boolean;
  circleDiameter?: number;
  circleStrokeWidth?: number;
  progressFillColor?: string;
  progressBackgroundColor?: string;
  className?: string;
  onCountdownTick?: (remainingSeconds: number) => void;
  onCountdownComplete?: () => void;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  countdownDuration,
  innerNumber = 5,
  countdownAutoStart = true,
  circleDiameter = 90,
  circleStrokeWidth = 8,
  className = '',
  progressFillColor = colorConstant.theme.DEFAULT,
  progressBackgroundColor = colorConstant.greyish.DEFAULT,
  onCountdownTick,
  onCountdownComplete,
}) => {
  const [progress, setProgress] = useState(100);
  const [key, setKey] = useState(0); // force CountdownTimer reset

  // Handle countdown tick
  const handleTick = (remainingSeconds: number) => {
    const percentage = (remainingSeconds / countdownDuration) * 100;
    setProgress(percentage);
    onCountdownTick?.(remainingSeconds);
  };

  // Reset when countdownDuration changes
  useEffect(() => {
    setProgress(100);
    setKey(prev => prev + 1); // force re-mount CountdownTimer
  }, [countdownDuration]);

  return (
    <View className={twMerge('w-full rounded-2xl bg-white p-8', className)} style={{elevation: 14}}>
      <View className="mx-auto p-2 bg-white rounded-full -mt-20 mb-5">
        <AnimatedCircularProgress fill={progress} size={circleDiameter} width={circleStrokeWidth} tintColor={progressFillColor} backgroundColor={progressBackgroundColor} lineCap="round">
          <View className="w-full flex-1 justify-center items-center bg-white">
            <Text className="font-interBold text-2xl">
              <CountdownTimer
                countdownDuration={countdownDuration}
                autoStart={countdownAutoStart}
                onTick={handleTick}
                onComplete={onCountdownComplete}
              />
            </Text>
          </View>
        </AnimatedCircularProgress>
      </View>
      <Text className="font-interBold text-xl text-theme">{question}</Text>
    </View>
  );
};
