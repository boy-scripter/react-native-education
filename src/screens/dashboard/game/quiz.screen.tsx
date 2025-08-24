import React, {Suspense} from 'react';
import {View, Text} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';
import {GameRegistry} from '@/types/quiz';
import Img from '@/components/ui/Img';
import FidgetLoader from '@/components/LoadingManger/FidgetLoader';

const Loader: React.FC = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <FidgetLoader message='Loading Your Game...'  />
  </View>
);

const QuizScreen: React.FC = () => {
  const route = useRoute<RouteProp<DashboardStackParamList, 'Quiz'>>();

  const {mode, category, ...anyOther} = route.params;

  const GameComponent = GameRegistry[mode].screen; // Get the game component from the registry

  return (
    <View className="flex-1 p-5 justify-start">
      <View className="flex-1 justify-center ">
        <Suspense fallback={<Loader />}>
          <GameComponent mode={mode} category={category} {...anyOther} />
        </Suspense>
      </View>
    </View>
  );
};

export default QuizScreen;
