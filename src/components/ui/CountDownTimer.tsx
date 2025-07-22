import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {View, Text} from 'react-native';
import {useTimer} from 'react-timer-hook';
import { twMerge } from 'tailwind-merge';

type CountdownTimerProps = {
  duration?: number; // in seconds
  autoStart?: boolean;
  onChange?: (p1: boolean) => any;
  onExpire?: () => void;
  textClassName?: string; // Optional className for styling the text
};

export type CountdownTimerRef = {
  start: () => void;
  pause: () => void;
  restart: (newDuration: number, autoStart?: boolean) => void;
};

const CountdownTimer = forwardRef<CountdownTimerRef, CountdownTimerProps>(({duration = 0, textClassName, autoStart = false, onExpire , onChange}, ref) => {
  const currentDuration = useRef(duration) ;

  const calculateTime = (secondsFromNow: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + secondsFromNow);
    return time;
  };

  const {seconds, minutes, start, pause, restart, isRunning} = useTimer({
    expiryTimestamp: calculateTime(currentDuration.current),
    autoStart,
    onExpire,
  });

  useEffect(() => {
    if(typeof onChange === 'function'){
      onChange(isRunning);
    }

  }, [isRunning]);

  // Expose methods to parent  
  useImperativeHandle(
    ref,
    () => ({
      start,
      pause,
      restart: (newDuration: number, autoStart = true) => {
        currentDuration.current = newDuration;
        const newTime = calculateTime(newDuration);
        restart(newTime, autoStart);
      },
    })
  );

  return (
    <View>
      <Text className={twMerge(textClassName , 'text-white font-interBold')}>
        {(minutes > 0 ? String(minutes).padStart(2, '0') + ':' : '')}
        {String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
});

export default CountdownTimer;
