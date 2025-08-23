import {View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {navigate} from '@hooks/useNavigation.hook';
import Icon from 'react-native-vector-icons/AntDesign';
import AnswerBox from './components/AnswerBox';
import colorConstant from '@/constant/color.constant';
import {QuestionBox} from './components/QuestionBox';

const QuizScreen: React.FC = () => {
  return (
    <View className="p-5 justify-start flex-1">
      {/* question status indicator starts here */}
   
      {/* question status indicator ends here*/}

      {/* question and answer box */}
      <View className="flex-1 justify-center ">
        <QuestionBox></QuestionBox>

        {/* answer box starts here */}
        <View className="options gap-4 mt-5 w-full">
          <AnswerBox id="1" label="Test" status="correct" />
          <AnswerBox id="1" label="Test" status="correct" />
          <AnswerBox id="1" label="Test" status="incorrect" />
          <AnswerBox id="1" label="Test" />
        </View>
        {/* answer box ends here */}
      </View>
    </View>
  );
};

export default QuizScreen;
