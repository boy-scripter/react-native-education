import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import {AuthenticatedUser} from '@/types/auth';
import {navigate} from '@hooks/useNavigation.hook';
import {Text, View, ScrollView, FlatList} from 'react-native';
import {RankingAndLeaderboard} from './components/ratingandview';
import {LoadingManager, Pulse} from '@/components/LoadingManger';
import {useHomeFacade} from './home.facade';
import {CategoryCardComponent} from './components/categorycard';
import Img from '@/components/ui/Img';
import ProfileImage from '@assets/images/profile.png';

export default function HomeScreen() {
  const {categories, personalLeaderboard, onInitialPageRender} = useHomeFacade();
  const user = useRootState(selectUser) as unknown as AuthenticatedUser['user'];

  return (
    <View className="px-4 flex-1 py-4 mt-2 ">
      <View className="flex flex-row justify-between">
        <View className="self-end">
          <Text className="font-interBold text-xl">Hi, {user.name}</Text>
          <Text>Let's Make this Day Productive</Text>
        </View>
        <View>
          <Img
            fallbackUri={ProfileImage}
            onPress={() => navigate('DashboardStack', {screen: 'HomeTab', params: {screen: 'EditProfile'}})}
            className="w-16 h-16 rounded-lg overflow-hidden"
            source={user.avatar}
          />
        </View>
      </View>
      <LoadingManager skeleton={<SkeletonLoading />} asyncFunction={onInitialPageRender}>
        <RankingAndLeaderboard rank={personalLeaderboard?.rank} points={personalLeaderboard?.totalPoints} />
        <View>
          <View className="flex-col gap-4">
            <FlatList
              data={categories}
              contentContainerClassName="gap-4 "
              keyExtractor={item => item._id}
              renderItem={({item}) => <CategoryCardComponent {...item} />}
              contentContainerStyle={{paddingVertical: 10}} // optional styling
              showsVerticalScrollIndicator={false} // optional
            />
          </View>
        </View>
      </LoadingManager>
    </View>
  );
}

function SkeletonLoading() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="p-1 pt-2 dark:bg-black">
      {/* Rank & Points */}
      <View className="flex-row justify-between border-theme rounded-lg mb-4">
        <Pulse className="w-[48%] h-16" />
        <Pulse className="w-[48%] h-16" />
      </View>

      {/* Leaderboard Button */}
      <Pulse className="h-12 w-full mb-5" />

      {/* Quiz Cards (Repeatable) */}
      {[1, 2, 3, 4].map((_, index) => (
        <View key={index} className="flex-row items-start bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
          <Pulse className="w-32 h-32 rounded-md" />
          <View className="flex-1 ml-3">
            <Pulse className="w-36 h-4 mb-2" />
            <Pulse className="w-24 h-4 mb-3" />
            <View className="flex-col gap-2  justify-between">
              <Pulse className=" h-8" />
              <Pulse className=" h-8" />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
