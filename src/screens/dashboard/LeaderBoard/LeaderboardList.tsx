import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {LeaderboardUser} from '@myTypes/leaderboard/leaderboard.interface';

interface LeaderboardListProps {
  leaderboardData: LeaderboardUser[];
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({leaderboardData}) => (
  <View className="p-4 gap-3 pb-8">
    {leaderboardData.map((user, index) => (
      <TouchableOpacity key={index} className="bg-white rounded-2xl p-4 border-l-4 border-gray-200 shadow-md android:elevation-3" activeOpacity={0.8}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Text className="text-base font-bold text-gray-700 w-8 text-center">#{index + 4}</Text>
            <Image source={{uri: user.avatar}} className="w-12 h-12 rounded-full mx-3 border-2 border-gray-200" />
            <Text className="text-base font-semibold text-gray-800 flex-1">{user.name}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="bg-gray-100 px-3 py-2 rounded-full flex-row items-baseline">
              <Text className="text-base font-bold text-gray-800">{user.points}</Text>
              <Text className="text-xs text-gray-500 ml-1">pts</Text>
            </View>
            <Text className="text-base">📈</Text>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export default LeaderboardList;
