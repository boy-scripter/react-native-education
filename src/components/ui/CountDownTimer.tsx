import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {View, Text} from 'react-native';
import {useTimer} from 'react-timer-hook';

type CountdownTimerProps = {
  duration: number; // in seconds
  autoStart?: boolean;
  onExpire?: () => void;
  textClassName?: string; // Optional className for styling the text
};

export type CountdownTimerRef = {
  start: () => void;
  pause: () => void;
  restart: (newDuration: number, autoStart?: boolean) => void;
  isRunning: boolean;
};

const CountdownTimer = forwardRef<CountdownTimerRef, CountdownTimerProps>(({duration, textClassName, autoStart = false, onExpire}, ref) => {
  const currentDuration = useRef(duration);

  const calculateTime = (secondsFromNow: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + secondsFromNow);
    return time;
  };

  const {seconds, minutes, start, pause, restart, isRunning} = useTimer({
    expiryTimestamp: calculateTime(duration),
    autoStart,
    onExpire,
  });

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    start,
    pause,
    isRunning,
    restart: (newDuration: number, autoStart = false) => {
      currentDuration.current = newDuration;
      const newTime = calculateTime(newDuration);
      restart(newTime, autoStart);
    },
  }), []);

  return (
    <View>
      <Text className={textClassName || 'text-white font-interBold'}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        <Text>{isRunning ? 'Running' : 'Not running'}</Text>
      </Text>
    </View>
  );
});

export default CountdownTimer;
