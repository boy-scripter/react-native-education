import {useSelector} from 'react-redux';
import {selectGame, selectGameState} from '@/store/quiz/quiz.selector';
import {AllGameStrategy} from '@myTypes/quiz/quiz.interface';

export function useGameState<T extends AllGameStrategy['type']>(expectedType: T) {
  const state = useSelector(selectGame);

  if (!state) {
    alert('Game State is not available');
    throw new Error('Game State is not available');
  }

  return (state as Extract<AllGameStrategy, {type: T}>).state;
}
