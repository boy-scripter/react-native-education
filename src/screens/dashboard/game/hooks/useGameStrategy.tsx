import {useSelector} from 'react-redux';
import {selectGame} from '@/store/quiz/quiz.selector';
import {AllGameStrategy, GameModeType} from '@myTypes/quiz';
import {SinglePlayerStratergy} from '../stratigies/single/logic';

const GameMapType = {
  [GameModeType.Single]: () => SinglePlayerStratergy,
  //   [GameModeType.Single]: () => SinglePlayerStratergy,
};

export function useStrategy<T extends AllGameStrategy['type']>(mode: T) {
  const game = useSelector(selectGame);

  if (!game) {
    alert('Game is not initialized');
    throw new Error('Game is not initialized');
  }

  // ✅ Narrow the union using mode
  return game as Extract<AllGameStrategy, {type: T}>['strategy'];
}
