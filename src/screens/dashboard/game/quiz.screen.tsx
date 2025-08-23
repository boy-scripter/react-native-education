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
      <View className="flex-row mt-10 gap-6 px-2 items-center ">
        <Icon onPress={() => navigate('result')} name="doubleright" color="black" size={18} className="border-greyish-100 bg-white border font-interBold p-2 rounded-full" />
        <View className="p-3 px-4 border-2 flex-row items-center gap-2 border-greyish-100  rounded-3xl flex-1">
          <View className="bg-theme rounded-xl p-1.5  flex-1"></View>
          <Text className="text-greyish-100 font-interBold">5/10</Text>
        </View>
      </View>
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
