import {AnswerType, GameModeType, IStartGame} from '@/types/quiz';
import {View} from 'react-native';
import {QuestionBox} from '../../../components/QuestionBox';
import {useStrategy} from '../../../hooks/useGameStrategy';
import {selectCurrentQuestion, selectGameState} from '@/store/quiz/quiz.selector';
import {JoyStickLoader} from '@/components/LoadingManger';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AnswerBox from '../../../components/AnswerBox';
import {Indicator} from '../../../components/Indicator';
import {selectQuizStats} from '../logic';

export default function Game({mode, categoryId}: IStartGame) {
  const questionDetails = useSelector(selectCurrentQuestion);
  const quizStats = useSelector(selectQuizStats);
  const strategy = useStrategy(GameModeType.Single);

  useEffect(() => {
    strategy.startGame({mode, categoryId});
  }, []);

  if (!questionDetails) {
    return (
      <View>
        <JoyStickLoader message="Loading Your Question..." />
      </View>
    );
  }

  return (
    <View>
      <Indicator total_questions={quizStats.totalQuestions} asked={quizStats.asked} />
      <QuestionBox countdownDuration={questionDetails.time} question={questionDetails.questionText} />
      <View className="options gap-4 mt-10 w-full">
        {questionDetails.options.map((value, index) => {
          return <AnswerBox key={index} id={index as AnswerType} label={value} onSelectId={() => strategy.submitAnswer(index as AnswerType)} />;
        })}
      </View>
    </View>
  );
}
