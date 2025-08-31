import React, {Suspense} from 'react';
import {View, ScrollView} from 'react-native';
import {navigate, replace} from '@hooks/useNavigation.hook';
import {ActionButtons} from './components';
import {SpinnerLoader} from '@/components/LoadingManger';
import {GameRegistry} from '@/types/quiz';
import {useSelector} from 'react-redux';
import {selectCurrentMode, selectGameCategory} from '@/store/quiz/quiz.selector';
import {Header} from '@/components/ui/Header';
import {useFocusEffect} from '@react-navigation/native';

const ResultScreen: React.FC = () => {
  const mode = useSelector(selectCurrentMode);
  const categoryId = useSelector(selectGameCategory);

  if (!mode || !categoryId) {
    navigate('DashboardStack', {screen: 'HomeTab', params: {screen: 'Home'}});
    return null;
  }

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
                {label: 'Play Again', icon: 'reload', action: () => replace('DashboardStack', {screen: 'Quiz', params: {mode, categoryId}}), color: 'bg-theme'},
                {label: 'Home', icon: 'home', action: () => replace('DashboardStack', {screen: 'HomeTab', params: {screen: 'Home'}}), color: 'bg-gray-700'},
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
