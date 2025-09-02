import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import {useTimer} from 'react-timer-hook';
import {twMerge} from 'tailwind-merge';

export type CountdownTimerProps = {
  countdownDuration: number; // Countdown duration in seconds
  autoStart?: boolean; // Automatically start countdown on mount
  isRunning?: boolean; // Control running state externally
  onTick?: (remainingSeconds: number) => void; // Callback on each tick
  onComplete?: () => void; // Callback when countdown finishes
  textClassName?: string; // Optional styling
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({countdownDuration, isRunning: externalRunning, onTick, onComplete, textClassName, autoStart = false}) => {
  
  // Helper to calculate expiry timestamp
  const calculateExpiryTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  };

  const {seconds, minutes, start, pause, restart, isRunning} = useTimer({
    expiryTimestamp: calculateExpiryTime(countdownDuration),
    autoStart,
    onExpire: onComplete,
  });

  useEffect(() => {
    if (externalRunning === true && !isRunning) start();
    if (externalRunning === false && isRunning) pause();
  }, [externalRunning, isRunning]);


  useEffect(() => {
      restart(calculateExpiryTime(countdownDuration), externalRunning ?? autoStart);
  }, [countdownDuration]);

  useEffect(() => {
      return () => {
        pause();
      };
  }, []);

  return (
    <View>
      <Text className={twMerge('text-white font-interBold', textClassName)}>
        {minutes > 0 ? String(minutes).padStart(2, '0') + ':' : ''}
        {String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
};

export default CountdownTimer;
