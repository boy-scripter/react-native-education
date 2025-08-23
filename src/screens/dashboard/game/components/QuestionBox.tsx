import React from 'react';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {twMerge} from 'tailwind-merge';
import CountdownTimer, {CountdownTimerProps} from '@/components/ui/CountDownTimer';
import colorConstant from '@/constant/color.constant';

export type QuestionBoxProps = {
  question?: string /** Text of the question displayed below the circle */;
  progressPercentage?: number /** Circular progress fill percentage (0-100) */;
  circleDiameter?: number /** Diameter of the circular progress in pixels */;
  circleStrokeWidth?: number /** Stroke width of the circular progress */;
  innerNumber?: number /** Number displayed inside the circle (fallback if countdown not used) */;
  progressFillColor?: string /** Color of the circular progress fill */;
  progressBackgroundColor?: string /** Color of the circular progress background */;
  className?: string /** Additional styling classes for container */;
  // coundown realted
  countdownDuration: number /** Props to pass to the internal CountdownTimer component */;
  countdownAutoStart?: boolean /** Automatically start countdown when mounted */;
  countdownRunning?: string;
  onCountdownTick?: (remainingSeconds: number) => void /** Callback triggered on each tick of the countdown */;
  onCountdownComplete?: () => void /** Callback triggered when countdown reaches zero */;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({
  innerNumber = 5,
  countdownAutoStart = false,
  question = 'What is the most popular game throughout the world?',
  progressPercentage = 0,
  circleDiameter = 90,
  circleStrokeWidth = 8,
  className = '',
  progressFillColor = colorConstant.theme.DEFAULT,
  progressBackgroundColor = colorConstant.greyish.DEFAULT,
  onCountdownTick,
  onCountdownComplete,
}) => {
  return (
    <View className={twMerge('w-full rounded-2xl bg-white p-8', className)} style={{elevation: 14}}>
      <View className="mx-auto p-2 bg-white rounded-full -mt-20 mb-5">
        <AnimatedCircularProgress fill={progressPercentage} size={circleDiameter} width={circleStrokeWidth} tintColor={progressFillColor} backgroundColor={progressBackgroundColor} lineCap="round">
          {
            <View className="w-full flex-1 justify-center items-center bg-white">
              <Text className="font-interBold text-2xl">
                <CountdownTimer countdownDuration={10} autoStart={countdownAutoStart} onTick={onCountdownTick} onComplete={onCountdownComplete} />
              </Text>
            </View>
          }
        </AnimatedCircularProgress>
      </View>
      <Text className="font-interBold text-xl text-theme">{question}</Text>
    </View>
  );
};
