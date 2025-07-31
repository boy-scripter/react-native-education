import {MotiView} from 'moti';
import React, {ReactNode, useState, useEffect, useCallback, JSX} from 'react';
import Loader from '../ui/Loader';
import { SpinnerLoader } from './SpinnerLoader';


interface LoadingManagerProps<T = any> {
  /** Async function to execute and manage loading state for */
  asyncFunction: () => Promise<T>;

  /** Content to render when data is loaded - can be ReactNode or function */
  children: ReactNode | ((data: T | null, error: Error | null, isLoading: boolean) => ReactNode);

  /** Skeleton component to show during loading */
  skeleton?: ReactNode;

  /** Number of skeleton components to render */
  skeletonCount?: number;

  /** NativeWind/Tailwind CSS classes for container styling */
  className?: string;

  /** Dependencies array - when changed, async function will re-execute */
  dependencies?: React.DependencyList;

  /** Callback fired when async function resolves successfully */
  onSuccess?: (data: T) => void;

  /** Callback fired when async function rejects with error */
  onError?: (error: Error) => void;

  /** Component to render when there's an error */
  errorComponent?: (error: Error) => ReactNode;

  /** Minimum loading time in milliseconds to prevent skeleton flash */
  minLoadingTime?: number;
}

export const LoadingManager = <T = any,>({
  asyncFunction,
  children,
  skeleton = <SpinnerLoader/>,
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
    <MotiView className={className} animate={{opacity: 1}} transition={{type: 'timing', duration: 300}}>
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
        <MotiView from={{opacity: 0, translateY: 10}} animate={{opacity: 1, translateY: 0}} transition={{type: 'timing', duration: 400}}>
          {typeof children === 'function' ? children(data, error, isLoading) : children}
        </MotiView>
      )}
    </MotiView>
  );
};
