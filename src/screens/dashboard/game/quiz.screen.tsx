import {View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {navigate} from '@hooks/useNavigation.hook';
import Icon from 'react-native-vector-icons/AntDesign';
import AnswerBox from './components/AnswerBox';

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
        <View className="w-full rounded-2xl bg-white  p-8" style={{elevation: 14}}>
          <View className="mx-auto p-2 bg-white rounded-full -mt-20 mb-5">
            {/* ciricular indicator */}
            <AnimatedCircularProgress
              children={() => (
                <View className="w-full flex-1 justify-center items-center bg-white">
                  <Text className="font-interBold text-2xl">12</Text>
                </View>
              )}
              size={90}
              width={8}
              fill={80}
              tintColor={colorConstant.theme.DEFAULT}
              backgroundColor={colorConstant.greyish.DEFAULT}
              lineCap="round"
            />
            {/* circualr indiactor ends here */}
          </View>
          <Text className="font-interBold text-xl text-theme ">What is the most Poppular game thoughtout the world ?</Text>
        </View>

        {/* answer box starts here */}
        <View className="options gap-4 mt-5 w-full">
          <AnswerBox status='correct' />
          <AnswerBox status="correct" />
          <AnswerBox status="incorrect" />
          <AnswerBox />
        </View>
        {/* answer box ends here */}
      </View>
    </View>
  );
};

export default QuizScreen;
