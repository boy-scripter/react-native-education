import {GameModeType, IStartGame} from '@/types/quiz';
import {View} from 'react-native';
import {QuestionBox} from '../../../components/QuestionBox';
import AnswerBox from '../../../components/AnswerBox';
import {useStrategy} from '../../../hooks/useGameStrategy';

export default function Game({mode, category}: IStartGame) {
  const strategy = useStrategy(GameModeType.Single);
 
      strategy.startGame({mode, category});

  return (
    <>
      <View>
        <QuestionBox countdownDuration={10} question="Test"></QuestionBox>
        <View className="options gap-4 mt-5 w-full">
          <AnswerBox id="1" label="Test" status="correct" />
          <AnswerBox id="1" label="Test" status="correct" />
          <AnswerBox id="1" label="Test" status="incorrect" />
          <AnswerBox id="1" label="Test" />
        </View>
      </View>
    </>
  );
}
