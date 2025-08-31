import React, {Suspense} from 'react';
import {View, ScrollView} from 'react-native';
import {goBack, navigate, replace} from '@hooks/useNavigation.hook';
import {ActionButtons} from './components';
import {SpinnerLoader} from '@/components/LoadingManger';
import {GameRegistry} from '@/types/quiz';
import {Header} from '@/components/ui/Header';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from '@/types/navigation/dashboardstack/dashboardstack.interface';

const ResultScreen: React.FC = () => {
  const route = useRoute<RouteProp<DashboardStackParamList, 'Result'>>();
  const {mode, categoryId} = route.params;

  const ResultComponent = GameRegistry[mode].result;

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header message="Result" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Suspense fallback={<SpinnerLoader />}>
          <View className="flex-1 mt-2 justify-center items-center px-6 pb-8">
            <ResultComponent />
            <ActionButtons
              buttons={[
                {label: 'Play Again', icon: 'reload', action: () => replace('Quiz', {params: {mode, categoryId}}), color: 'bg-theme'},
                {label: 'Home', icon: 'home', action: () => goBack(), color: 'bg-gray-700'},
                {label: 'See PDF', icon: 'file-pdf-box', action: () => navigate('DashboardStack', {screen: 'PdfShow', params: {category: categoryId}}), color: 'bg-red-600'},
                {label: 'Leaderboard', icon: 'trophy', action: () => navigate('DashboardStack', {screen: 'Leaderboard'}), color: 'bg-yellow-600'},
              ]}
            />
          </View>
        </Suspense>
      </ScrollView>
    </View>
  );
};

export default ResultScreen;
