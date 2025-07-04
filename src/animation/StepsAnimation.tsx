import React from 'react';
import {AnimatePresence, MotiView} from 'moti';
import {twMerge} from 'tailwind-merge';

interface StepsAnimationProps {
  step: number;
  children: React.ReactNode[];
  duration?: number;
  className?: string;
  mode?: 'soft' | 'hard'; // 🔥 new feature
}

export const StepsAnimation = ({step, children, className, duration = 400, mode = 'soft'}: StepsAnimationProps) => {
  const childArray = React.Children.toArray(children);

  if (mode === 'soft') {
    return (
      <>
        {childArray.map((child, index) => {
          const show = index + 1 === step;
          return (
            <MotiView
              key={`step-${index + 1}`}
              from={{opacity: 0, translateY: 20, scale: 0.95}}
              animate={{
                opacity: show ? 1 : 0,
                translateY: show ? 0 : 20,
                scale: show ? 1 : 0.96,
              }}
              style={{
                pointerEvents: show ? 'auto' : 'none', // Prevent touch events when hidden
                height: show ? 'auto' : 0, // Adjust height for smooth transition
              }}
              transition={{type: 'timing', duration}}
              className={twMerge('overflow-hidden', className)}>
              {child}
            </MotiView>
          );
        })}
      </>
    );
  }

  // Soft mode with AnimatePresence
  return (
    <AnimatePresence>
      {childArray.map((child, index) => {
        const realIndex = index + 1;
        if (realIndex !== step) return null;

        return (
          <MotiView
            key={`step-${realIndex}`}
            from={{opacity: 0, translateY: 20}}
            animate={{opacity: 1, translateY: 0}}
            exit={{opacity: 0, translateY: -20}}
            transition={{type: 'timing', duration}}
            className={className}>
            {child}
          </MotiView>
        );
      })}
    </AnimatePresence>
  );
};


// SMANTHANA@mail.dangminhhoa.edu.vn
// Tq7Cz3Zy0Jv3