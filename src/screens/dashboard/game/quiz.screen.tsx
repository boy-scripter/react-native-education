import React, {Suspense} from 'react';
import {View, Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';
import {GameRegistry} from '@/types/quiz';
import Img from '@/components/ui/Img';

const Loader: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-white">
    {/* Replace with your loader gif */}
    <Img source={require('@/assets/images/loader.gif')} className="w-22 aspect-square" resizeMode="contain" />
    <Text className="mt-4 text-lg text-gray-600">Loading your game...</Text>
  </View>
);

const QuizScreen: React.FC = () => {
  const route = useRoute<RouteProp<DashboardStackParamList, 'Quiz'>>();

  const {mode, category, ...anyOther} = route.params;

  // Get the game component from the registry
  const GameComponent = GameRegistry[mode].screen;

  return (
    <View className="flex-1 p-5 justify-start">
      <Suspense fallback={<Loader />}>
        <GameComponent mode={mode} category={category} {...anyOther} />
      </Suspense>
    </View>
  );
};

export default QuizScreen;

// {/* question and answer box */}
//     <View className="flex-1 justify-center ">
//       <QuestionBox countdownDuration={10}></QuestionBox>

//       {/* answer box starts here */}
//       <View className="options gap-4 mt-5 w-full">
//         <AnswerBox id="1" label="Test" status="correct" />
//         <AnswerBox id="1" label="Test" status="correct" />
//         <AnswerBox id="1" label="Test" status="incorrect" />
//         <AnswerBox id="1" label="Test" />
//       </View>
//       {/* answer box ends here */}
//     </View>
