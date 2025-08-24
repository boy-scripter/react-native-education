import {AllGameStrategy, ExtractByType, GameModeType, GameRegistry} from '@myTypes/quiz';

export function useStrategy<T extends AllGameStrategy['type']>(mode: T) {
  const strategyFn = GameRegistry[mode]?.strategy;

  if (!strategyFn) {
    alert('Game is not initialized');
    throw new Error('Game is not initialized');
  }

  // Narrow type using ExtractByType
  return strategyFn() as ExtractByType<AllGameStrategy, T>['strategy'];
}
