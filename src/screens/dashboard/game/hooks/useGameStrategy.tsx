import {AllGameStrategy, ExtractByType, GameRegistry} from '@myTypes/quiz';
import {BaseGameStrategy} from '../strategies/abstract.strategy';

const strategySingletons: Partial<Record<AllGameStrategy['type'], any>> = {};

// Overload signatures
export function useGameStrategy<T extends AllGameStrategy['type']>(mode: T): ExtractByType<AllGameStrategy, T>['strategy'];
export function useGameStrategy(): BaseGameStrategy | undefined;

// Implementation
export function useGameStrategy<T extends AllGameStrategy['type']>(mode?: T) {
  let actualMode: T | AllGameStrategy['type'] | undefined = mode;

  // If no mode provided, pick the first available initialized singleton
  if (!actualMode) {
    const availableModes = Object.keys(strategySingletons) as AllGameStrategy['type'][];
    if (availableModes.length === 0) {
      return undefined; // cannot instantiate abstract BaseStrategy
    }
    actualMode = availableModes[0];
  }

  // Return existing singleton if available
  if (strategySingletons[actualMode]) {
    return strategySingletons[actualMode] as T extends AllGameStrategy['type'] ? ExtractByType<AllGameStrategy, T>['strategy'] : BaseGameStrategy;
  }

  // Create singleton from registry
  const StrategyClass = GameRegistry[actualMode]?.strategy;
  if (!StrategyClass) {
    throw new Error('Game is not initialized');
  }

  const instance = new StrategyClass();
  strategySingletons[actualMode] = instance;

  return instance as T extends AllGameStrategy['type'] ? ExtractByType<AllGameStrategy, T>['strategy'] : BaseGameStrategy;
}

/** Reset singleton if needed */
export function resetGameStrategy<T extends AllGameStrategy['type']>(mode: T) {
  strategySingletons[mode] = undefined;
}
