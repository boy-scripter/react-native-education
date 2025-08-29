import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {twMerge} from 'tailwind-merge';
import {MotiView} from 'moti';
import CountdownTimer from '@/components/ui/CountDownTimer';
import colorConstant from '@/constant/color.constant';
import { TimerIcon , QuestionIcon } from '@/components/Icons';

export type QuestionBoxProps = {
  question: string;
  countdownDuration: number;
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
  const [key, setKey] = useState(0);

  useEffect(() => {
    setProgress(100);
    setKey(prev => prev + 1);
  }, [countdownDuration]);

  return (
    <MotiView
      from={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 500}}
      className={twMerge('w-full rounded-2xl bg-white border border-gray-200 mt-16 p-6 shadow-lg', className)}>
      <View className="mx-auto p-3 bg-white rounded-full border-2 border-blue-200 -mt-20 mb-4 shadow-md">
        <AnimatedCircularProgress fill={progress} size={circleDiameter} width={circleStrokeWidth} tintColor={progressFillColor} backgroundColor={progressBackgroundColor} lineCap="round">
          {() => (
            <View className="w-full flex-1 justify-center items-center">
              <TimerIcon size={20} color={progress < 20 ? '#ef4444' : '#3b82f6'} />
              <CountdownTimer
                key={key}
                textClassName="text-lg font-bold text-blue-600"
                countdownDuration={countdownDuration}
                autoStart={countdownAutoStart}
                onTick={remaining => {
                  setProgress((remaining / countdownDuration) * 100);
                  onCountdownTick?.(remaining);
                }}
                onComplete={onCountdownComplete}
              />
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View className="flex-row items-start gap-2 space-x-3">
        <View className="mt-1 p-2 bg-blue-100 rounded-full">
          <QuestionIcon size={14} color="#3b82f6" />
        </View>
        <Text className="flex-1 pt-1 font-bold text-lg text-gray-800">{question}</Text>
      </View>
    </MotiView>
  );
};


export const QuestionBox = React.memo(QuestionBoxComponent);
