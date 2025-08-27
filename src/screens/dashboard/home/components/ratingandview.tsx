import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import {navigate} from '@/hooks/useNavigation.hook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PersonalLeaderBoard {
  rank?: number;
  points?: number;
}

export function RankingAndLeaderboard(props: PersonalLeaderBoard) {
  return (
    <>
      <View className="mt-5 w-full mx-auto rounded-3xl  py-4">
        <View className="flex-row gap-5 justify-around items-center">
          {/* Rank Box */}
          <View className="flex-row flex-grow  items-center bg-yellow-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
            <LinearGradient colors={['#facc15', '#fbbf24']} className="p-3 rounded-lg overflow-hidden shadow">
              <Img source={require('@assets/images/trophy.png')} className="w-6 h-6 overflow-hidden rounded-lg" resizeMode="contain" />
            </LinearGradient>
            <View>
              <Text className="text-xs text-gray-600">Your Rank</Text>
              <Text className="text-lg font-interBold text-yellow-600">#{props.rank || 'NA'}</Text>
            </View>
          </View>

          {/* Points Box */}
          <View className="flex-row flex-grow  items-center bg-blue-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
            <LinearGradient colors={['#38bdf8', '#0ea5e9']} className="p-3 rounded-lg overflow-hidden shadow">
              <Img source={require('@assets/images/coin.png')} className="w-6 h-6 overflow-hidden rounded-lg" resizeMode="contain" />
            </LinearGradient>
            <View>
              <Text className="text-xs text-gray-600">Total Points</Text>
              <Text className="text-lg font-interBold text-sky-600">{props.points || 'NA'}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* checdk learborad button */}
      <Button onPress={() => navigate('DashboardStack', {screen: 'Leaderboard'})} label="Check Leaderboard" className="flex-row mt-1 items-center">
        <Icon name="trophy-outline" size={30} color={'yellow'} />
      </Button>
    </>
  );
}
