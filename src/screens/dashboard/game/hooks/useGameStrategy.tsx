import {AllGameStrategy, ExtractByType, GameModeType, GameRegistry} from '@myTypes/quiz';

const strategySingletons: Partial<Record<AllGameStrategy['type'], any>> = {};

export function useGameStrategy<T extends AllGameStrategy['type']>(mode: T) {
  if (strategySingletons[mode]) {
    return strategySingletons[mode] as ExtractByType<AllGameStrategy, T>['strategy'];
  }

  const StrategyClass = GameRegistry[mode]?.strategy;
  if (!StrategyClass) {
    alert('Game is not initialized');
    throw new Error('Game is not initialized');
  }

  // Create singleton instance using class constructor
  const instance = new StrategyClass();
  strategySingletons[mode] = instance;

  return instance as ExtractByType<AllGameStrategy, T>['strategy'];
}

/** Reset singleton if needed */
export function resetGameStrategy<T extends AllGameStrategy['type']>(mode: T) {
  strategySingletons[mode] = undefined;
}
