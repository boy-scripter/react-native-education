import React from 'react';
import {AnimatePresence, MotiView} from 'moti';
import {twMerge} from 'tailwind-merge';

interface StepsAnimationProps {
  step: number;
  children: React.ReactNode[];
  duration?: number;
  className?: string;
  mode?: 'soft' | 'hard'; 
}

export const StepsAnimation = ({step, children, className, duration = 300, mode = 'soft'}: StepsAnimationProps) => {
  const childArray = React.Children.toArray(children);

  if (mode === 'soft') {
    return (
      <>
        {childArray.map((child, index) => {
          const show = index + 1 === step;
          return (
            <MotiView
              key={`step-${index + 1}`}
              animate={{
                opacity: show ? 1 : 0,
                translateX: show ? 0 : index < step - 1 ? -10 : 10,  // Slide in from left for previous steps, right for next
              }}
              style={{
                pointerEvents: show ? 'auto' : 'none', // Prevent touch events when hidden
                display: show ? 'flex' : 'none', // Hide the view completely when not shown
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
  const activeChild = childArray[step - 1];
  return (
    <AnimatePresence exitBeforeEnter>
      {activeChild && (
        <MotiView
          key={`step-${step}`}
          from={{opacity: 0, translateX: 10}}
          animate={{opacity: 1, translateX: 0}}
          exit={{opacity: 0, translateX: -10}}
          transition={{type: 'timing', duration}}
          className={className}>
          {activeChild}
        </MotiView>
      )}
    </AnimatePresence>
  );
};

// SMANTHANA@mail.dangminhhoa.edu.vn
// Tq7Cz3Zy0Jv3
