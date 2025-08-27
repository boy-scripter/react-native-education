import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {twMerge} from 'tailwind-merge';
import CountdownTimer from '@/components/ui/CountDownTimer';
import colorConstant from '@/constant/color.constant';

export type QuestionBoxProps = {
  question: string;
  countdownDuration: number; // dynamic from parent
  countdownAutoStart?: boolean;
  circleDiameter?: number;
  circleStrokeWidth?: number;
  progressFillColor?: string;
  progressBackgroundColor?: string;
  className?: string;
  onCountdownTick?: (remainingSeconds: number) => void;
  onCountdownComplete?: () => void;
};

const QuestionBoxComponent: React.FC<QuestionBoxProps> = ({
  question,
  countdownDuration,
  className = '',
  countdownAutoStart = true,
  circleDiameter = 90,
  circleStrokeWidth = 8,
  progressFillColor = colorConstant.theme.DEFAULT,
  progressBackgroundColor = colorConstant.greyish.DEFAULT,
  onCountdownTick,
  onCountdownComplete,
}) => {
  const [progress, setProgress] = useState(100);
  const [key, setKey] = useState(0); // force CountdownTimer reset

  // Reset when countdownDuration changes
  useEffect(() => {
    setProgress(100);
    setKey(prev => prev + 1); // force re-mount CountdownTimer
  }, [countdownDuration]);

  return (
    <View className={twMerge('w-full rounded-2xl bg-white border  border-greyish-100 mt-16 p-8', className)}>
      <View className="mx-auto p-2 bg-white rounded-full border border-greyish-100 -mt-20 mb-5">
        <AnimatedCircularProgress fill={progress} size={circleDiameter} width={circleStrokeWidth} tintColor={progressFillColor} backgroundColor={progressBackgroundColor} lineCap="round">
          {() => (
            <View className="w-full flex-1 justify-center items-center bg-white">
              <Text className="font-interBold text-2xl">
                <CountdownTimer
                  key={key}
                  textClassName="text-3xl text-theme"
                  countdownDuration={countdownDuration}
                  autoStart={countdownAutoStart}
                  onTick={remaining => {
                    setProgress((remaining / countdownDuration) * 100);
                    onCountdownTick?.(remaining);
                  }}
                  onComplete={onCountdownComplete}
                />
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <Text className="font-interBold text-xl text-theme">{question}</Text>
    </View>
  );
};

export const QuestionBox = React.memo(QuestionBoxComponent);