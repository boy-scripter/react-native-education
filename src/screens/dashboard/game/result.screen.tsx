import React, {Suspense} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import {Share} from 'react-native';
import {ActionButtons} from './components';
import {SpinnerLoader} from '@/components/LoadingManger';
import {GameRegistry} from '@/types/quiz';
import {useSelector} from 'react-redux';
import {selectCurrentMode, selectGameCategory} from '@/store/quiz/quiz.selector';

const ResultScreen: React.FC = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Suspense fallback={<SpinnerLoader />}>
          <View className="flex-1 mt-2 justify-center items-center px-6 pb-8">
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
      </ScrollView>
    </View>
  );
};

const Header: React.FC = ({message}: {message?: string}) => (
  <View
    className="pt-6 pb-6 px-6 bg-white"
    style={{
      borderBottomLeftRadius: 20, // adjust radius as needed
      borderBottomRightRadius: 20,
    }}>
    <View className="flex-row items-center justify-center">
      <View className="items-center">
        <Text className="text-xl text-center font-interBold text-gray-800">Results</Text>
        {message && <Text className="text-sm text-gray-600 font-interMedium">{message}</Text>}
        <Text className="text-center text-sm text-gray-500 font-interMedium">You've completed the quiz 🎉</Text>
      </View>
    </View>
  </View>
);

function ShareMessage() {}
export default ResultScreen;
