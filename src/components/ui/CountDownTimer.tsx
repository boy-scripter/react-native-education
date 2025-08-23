import React, {useEffect, useRef, useState} from 'react';
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
  const currentDuration = useRef(countdownDuration);
  const [key, setKey] = useState(0); // Force reset when duration changes

  // Helper to calculate expiry timestamp
  const calculateExpiryTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  };

  const {seconds, minutes, start, pause, restart, isRunning} = useTimer({
    expiryTimestamp: calculateExpiryTime(currentDuration.current),
    autoStart,
    onExpire: onComplete,
  });

  // Sync internal timer with external running state
  useEffect(() => {
    if (externalRunning === true && !isRunning) start();
    if (externalRunning === false && isRunning) pause();
  }, [externalRunning]);

  // Call onTick with remaining seconds
  useEffect(() => {
    onTick?.(minutes * 60 + seconds);
  }, [seconds, minutes]);

  // Restart timer if countdownDuration changes
  useEffect(() => {
    currentDuration.current = countdownDuration;
    setKey(k => k + 1); // Re-mount to reset
  }, [countdownDuration]);

  return (
    <View key={key}>
      <Text className={twMerge(textClassName, 'text-white font-interBold')}>
        {minutes > 0 ? String(minutes).padStart(2, '0') + ':' : ''}
        {String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
};

export default CountdownTimer;
