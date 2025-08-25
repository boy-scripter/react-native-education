import {GameModeType, IStartGame} from '@/types/quiz';
import {View} from 'react-native';
import {QuestionBox} from '../../../components/QuestionBox';
import {useStrategy} from '../../../hooks/useGameStrategy';
import {useSelector} from 'react-redux';
import {selectCurrentQuestion} from '@/store/quiz/quiz.selector';
import {JoyStickLoader} from '@/components/LoadingManger';
import React, {useEffect} from 'react';
import AnswerBox from '../../../components/AnswerBox';


export default function Game({mode, categoryId}: IStartGame) {
  const questionDetails = useSelector(selectCurrentQuestion);
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
      <QuestionBox countdownDuration={questionDetails.time} question={questionDetails.questionText} />
      <View className="options gap-4 mt-10 w-full">
        {questionDetails.options.map((value,index) => {
      
          return <AnswerBox key={index} id={AnswerType.Option_0} label={value} onSelectId={() => strategy.submitAnswer(AnswerType.Option_0)} />;
        })}
      </View>
    </View>
  );
}
