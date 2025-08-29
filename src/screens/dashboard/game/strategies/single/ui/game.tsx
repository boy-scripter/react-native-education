import {AnswerType, GameModeType, IStartGame} from '@/types/quiz';
import {View} from 'react-native';
import {useGameStrategy} from '../../../hooks/useGameStrategy';
import {selectCurrentQuestion} from '@/store/quiz/quiz.selector';
import {useSelector} from 'react-redux';
import {JoyStickLoader} from '@/components/LoadingManger';
import {QuestionBox} from '../../../components/QuestionBox';
import {Indicator} from '../../../components/Indicator';
import {selectQuizStats} from '../logic';
import AnswerBox from '../../../components/AnswerBox';
import React, {useEffect} from 'react';

export default function Game({mode, categoryId}: IStartGame) {
  const questionDetails = useSelector(selectCurrentQuestion);
  const quizStats = useSelector(selectQuizStats);
  const strategy = useGameStrategy(GameModeType.Single);

  useEffect(() => strategy.startGame({mode, categoryId}), []);

  if (!questionDetails) return <Loader />;

  return (
    <View>
      <Indicator total_questions={quizStats.total} asked={quizStats.asked} />
      <QuestionBox onCountdownComplete={() => strategy.submitAnswer(AnswerType.OPTION_SKIP)} countdownDuration={questionDetails.time} question={questionDetails.questionText} />
      <View className="options gap-4 mt-10 w-full">
        {questionDetails.options.map((value, index) => {
          return <AnswerBox key={index} id={index as AnswerType} label={value} onSelectId={() => strategy.submitAnswer(index as AnswerType)} />;
        })}
      </View>
    </View>
  );
}

function Loader() {
  return (
    <View>
      <JoyStickLoader message="Loading Your Question..." />
    </View>
  );
}
