import {MotiView} from 'moti';
import React, {ReactNode, useState, useEffect, useCallback, JSX} from 'react';
import Loader from '../ui/Loader';
import {SpinnerLoader} from './SpinnerLoader';
import {twMerge} from 'tailwind-merge';

interface LoadingManagerProps<T = any> {
  asyncFunction: () => Promise<T> /** Async function to execute and manage loading state for */;
  children: ReactNode | ((data: T | null, error: Error | null, isLoading: boolean) => ReactNode) /** Content to render when data is loaded - can be ReactNode or function */;
  skeleton?: ReactNode /** Skeleton component to show during loading */;
  skeletonCount?: number /** Number of skeleton components to render */;
  className?: string /** NativeWind/Tailwind CSS classes for container styling */;
  dependencies?: React.DependencyList /** Dependencies array - when changed, async function will re-execute */;
  onSuccess?: (data: T) => void /** Callback fired when async function resolves successfully */;
  onError?: (error: Error) => void /** Callback fired when async function rejects with error */;
  errorComponent?: (error: Error) => ReactNode /** Component to render when there's an error */;
  minLoadingTime?: number /** Minimum loading time in milliseconds to prevent skeleton flash */;
}

export const LoadingManager = <T = any,>({
  asyncFunction,
  children,
  skeleton = <SpinnerLoader />,
  skeletonCount = 1,
  className = '',
  dependencies = [],
  onSuccess,
  onError,
  errorComponent,
  minLoadingTime = 500, // Minimum loading time to prevent flash
}: LoadingManagerProps<T>): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const executeAsyncFunction = useCallback(async () => {
    if (!asyncFunction) return;

    const startTime = Date.now();

    try {
      setIsLoading(true);
      setError(null);

      const result = await asyncFunction();

      // Ensure minimum loading time to prevent flash
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
      }

      setData(result);
      onSuccess?.(result);
    } catch (err: any) {
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction, onSuccess, onError, minLoadingTime]);

  useEffect(() => {
    executeAsyncFunction();
  }, [...dependencies]);

  // Animated container using Moti
  return (
    <MotiView className={twMerge('flex-1', className)} animate={{opacity: 1}} transition={{type: 'timing', duration: 300}}>
      {isLoading ? (
        // Show skeletons with stagger animation
        <MotiView from={{opacity: 0}} animate={{opacity: 1}} transition={{type: 'timing', duration: 200}}>
          {Array.from({length: skeletonCount}).map((_, index) => (
            <MotiView
              key={index}
              from={{opacity: 0, translateY: 20}}
              animate={{opacity: 1, translateY: 0}}
              transition={{
                type: 'timing',
                duration: 300,
                delay: index * 100, // Stagger animation
              }}>
              {skeleton}
            </MotiView>
          ))}
        </MotiView>
      ) : error && errorComponent ? (
        // Show error with fade in animation
        <MotiView from={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{type: 'spring', damping: 15}}>
          {errorComponent(error)}
        </MotiView>
      ) : (
        // Show content with fade in animation
        <MotiView className="flex-1 " from={{opacity: 0, translateY: 10}} animate={{opacity: 1, translateY: 0}} transition={{type: 'timing', duration: 400}}>
          {typeof children === 'function' ? children(data, error, isLoading) : children}
        </MotiView>
      )}
    </MotiView>
  );
};
