import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import {AuthenticatedUser} from '@/types/auth';
import {navigate} from '@hooks/useNavigation.hook';
import {Text, View, ScrollView} from 'react-native';
import {RankingAndLeaderboard} from './components/ratingandview';

import {LoadingManager, Pulse} from '@/components/LoadingManger';
import {useHomeFacade} from './home.facade';
import Img from '@/components/ui/Img';
import ProfileImage from '@assets/images/profile.png';
import { CategoryCardComponent } from './components/categorycard';


export default function HomeScreen() {
  const {categories, onInitialPageRender} = useHomeFacade();
  const user = useRootState(selectUser) as unknown as AuthenticatedUser['user'];



  return (
    <LoadingManager skeleton={<SkeletonLoading />} asyncFunction={onInitialPageRender}>
      <ScrollView className="px-4 py-4 mt-2 ">
        <View className="flex flex-row justify-between">
          <View className="self-end">
            <Text className="font-interBold text-xl">Hi, {user.name}</Text>
            <Text>Let's Make this Day Productive</Text>
          </View>
          <View>
            <Img fallbackUri={ProfileImage} onPress={() => navigate('DashboardStack', {screen: 'EditProfile'})} className="w-16 h-16 rounded-lg overflow-hidden" source={user.avatar} />
          </View>
        </View>
        <RankingAndLeaderboard />
        <View className="py-6">
          <View className="flex-col gap-4">
            {categories.map(currentObject => (
              <CategoryCardComponent key={currentObject._id} {...currentObject} />
            ))}
          </View>
        </View>
      </ScrollView>
    </LoadingManager>
  );
}

function SkeletonLoading() {
  return (
    <ScrollView className="p-4 bg-white dark:bg-black">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <View className="ml-3 flex-1">
          <Pulse className="w-32 h-4 mb-2" />
          <Pulse className="w-48 h-5" />
        </View>
        <Pulse className="w-20 h-20 rounded-full" />
      </View>

      {/* Rank & Points */}
      <View className="flex-row justify-between mb-4">
        <Pulse className="w-[48%] h-16" />
        <Pulse className="w-[48%] h-16" />
      </View>

      {/* Leaderboard Button */}
      <Pulse className="h-12 w-full mb-5" />

      {/* Quiz Cards (Repeatable) */}
      {[1, 2, 3, 4, 5].map((_, index) => (
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
