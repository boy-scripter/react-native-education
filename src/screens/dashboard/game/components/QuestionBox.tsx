import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {MotiView} from 'moti';
import {twMerge} from 'tailwind-merge';
import {TimerIcon, QuestionIcon} from '@/components/Icons';
import {CircularProgress} from '@/components/ui/CircularProgress';
import {useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import CountdownTimer from '@/components/ui/CountDownTimer';
import colorConstant from '@/constant/color.constant';

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
  circleDiameter = 100,
  circleStrokeWidth = 13,
  progressFillColor = colorConstant.theme.DEFAULT,
  progressBackgroundColor = colorConstant.greyish.DEFAULT,
  onCountdownTick,
  onCountdownComplete,
}) => {
  const [key, setKey] = useState(0);
  const progress = useSharedValue(100);

  useEffect(() => {
    progress.value = 100;
    setKey(prev => prev + 1); 
  }, [countdownDuration]);

  return (
    <MotiView
      from={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 500}}
      className={twMerge('w-full rounded-2xl bg-white border border-gray-200 mt-16 p-6 shadow-lg', className)}>
      <View className="mx-auto -mt-20 mb-4 justify-center items-center">
        <CircularProgress size={circleDiameter} strokeWidth={circleStrokeWidth} progress={progress} fillColor={progressFillColor} backgroundColor={progressBackgroundColor} />
        <View className="absolute w-full h-full justify-center items-center">
          <TimerIcon size={20} color={progress.value < 20 ? '#ef4444' : '#3b82f6'} />
          <CountdownTimer
            key={key}
            textClassName="text-lg font-bold text-blue-600"
            countdownDuration={countdownDuration}
            autoStart={countdownAutoStart}
            onTick={remaining => {
              progress.value = withTiming((remaining / countdownDuration) * 100, {
                duration: 500,
                easing: Easing.linear,
              });
              onCountdownTick?.(remaining);
            }}
            onComplete={onCountdownComplete}
          />
        </View>
      </View>

      {/* Question */}
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
