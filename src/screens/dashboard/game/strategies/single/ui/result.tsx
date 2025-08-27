import { useSelector } from 'react-redux';
import {PerformanceCard, ScoreCircle} from '../../../components';
import {selectQuizStats} from '../logic';
import { useEffect } from 'react';
import { useGameStrategy } from '../../../hooks/useGameStrategy';

export default function Result() {
  const strategy = useGameStrategy('SINGLE')
  const stats = useSelector(selectQuizStats);


  useEffect(( ) => {
    return strategy.gameClean()
  },[])


  return (
    <>
      <ScoreCircle score={stats.totalPoints} />
      <PerformanceCard correct={stats.correct} incorrect={stats.incorrect} skipped={stats.skipped} total={stats.asked} timeUsed={stats.totalTimeTaken} totalTime={stats.totalAvailableTime} />
    </>
  );
}
