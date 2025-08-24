import {GameModeType, IStartGame} from '@/types/quiz';
import {View} from 'react-native';
import {QuestionBox} from '../../../components/QuestionBox';
import AnswerBox from '../../../components/AnswerBox';
import {useStrategy} from '../../../hooks/useGameStrategy';
import {useSelector} from 'react-redux';
import {selectCurrentQuestion} from '@/store/quiz/quiz.selector';
import {JoyStickLoader} from '@/components/LoadingManger';

export default function Game({mode, category}: IStartGame) {
  const questionDetails = useSelector(selectCurrentQuestion);
  const strategy = useStrategy(GameModeType.Single);

  strategy.startGame({mode, category});

  if (!questionDetails) {
    return (
      <View>
        <JoyStickLoader message="Be Ready For First Question"></JoyStickLoader>
      </View>
    );
  }


  return (
    <>
      <View>
        <QuestionBox countdownDuration={questionDetails.time} question={questionDetails.questionText}></QuestionBox>
        <View className="options gap-4 mt-10 w-full">
          <AnswerBox id="1" label="Test" status="correct" />
          <AnswerBox id="1" label="Test" status="correct" />
          <AnswerBox id="1" label="Test" status="incorrect" />
          <AnswerBox id="1" label="Test" />
        </View>
      </View>
    </>
  );
}
