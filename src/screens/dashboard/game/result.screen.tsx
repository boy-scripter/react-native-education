import React, {Suspense} from 'react';
import {View, Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import {Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScoreCircle, PerformanceCard, ActionButtons} from './components';
import {SpinnerLoader} from '@/components/LoadingManger';
import {GameRegistry} from '@/types/quiz';
import {useSelector} from 'react-redux';
import {selectCurrentMode, selectGameCategory} from '@/store/quiz/quiz.selector';

const  ResultScreen: React.FC = () => {
  const mode = useSelector(selectCurrentMode);
  const categoryId = useSelector(selectGameCategory);

  if (!mode || !categoryId) {
    navigate('DashboardStack', {screen: 'Home'});
    return null;
  }
  const ResultComponent = GameRegistry[mode].result;

  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Suspense fallback={<SpinnerLoader />}>
        <View className="flex-1 justify-center items-center px-6 pb-8">
          <ResultComponent />
          <ActionButtons
            buttons={[
              {label: 'Play Again', icon: 'reload', action: () => navigate('DashboardStack', {screen: 'Quiz', params: {mode, categoryId}}), color: 'bg-theme'},
              {label: 'Home', icon: 'home', action: () => navigate('DashboardStack', {screen: 'Home'}), color: 'bg-gray-700'},
              {label: 'Share', icon: 'share-variant', action: () => Share.share({message: 'Check out my quiz results!'}), color: 'bg-blue-600'},
              {label: 'See PDF', icon: 'file-pdf-box', action: () => navigate('DashboardStack', {screen: 'PdfShow', params: {category: categoryId}}), color: 'bg-red-600'},
              {label: 'Check Sheet', icon: 'clipboard-check', action: () => console.log('Check Sheet'), color: 'bg-green-600'},
              {label: 'Leaderboard', icon: 'trophy', action: () => navigate('DashboardStack', {screen: 'Leaderboard'}), color: 'bg-yellow-600'},
            ]}
          />
        </View>
      </Suspense>
    </View>
  );
};

const Header: React.FC = ({message}: {message?: string}) => (
  <View className="pt-6 pb-6 px-6">
    <View className="flex-row items-center justify-between">
      <View className="items-center">
        <Text className="text-xl font-interBold text-gray-800">Results</Text>
        {message && <Text className="text-sm text-gray-600 font-interMedium">{message}</Text>}
        <Text className="text-center text-sm text-gray-500 font-interMedium">You've completed the quiz 🎉</Text>
      </View>
    </View>
  </View>
);

function ShareMessage() {}
export default ResultScreen