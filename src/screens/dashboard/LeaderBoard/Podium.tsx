import React from 'react';
import {View, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PodiumUser} from '@myTypes/leaderboard/leaderboard.interface';
import colorConstant from '@/constant/color.constant';

interface PodiumProps {
  podiumData: PodiumUser[];
}

const Podium: React.FC<PodiumProps> = ({podiumData}) => {
  // Sort users by points descending
  const sortedPodium = [...podiumData].sort((a, b) => b.points - a.points);

  // Gradient colors for podium blocks
  const rankGradients: Record<number, string[]> = {
    1: ['#FFD700', '#FFC700'], // Gold
    2: ['#C0C0C0', '#A9A9A9'], // Silver
    3: ['#CD7F32', '#B76C3B'], // Bronze
  };

  // Heights for podium blocks
  const getHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 110;
      case 2:
        return 90;
      case 3:
        return 70;
      default:
        return 60;
    }
  };

  return (
    <View className="flex-row flex-1 items-end justify-center px-4 gap-5 z-10 w-full">
      {[sortedPodium[1], sortedPodium[0], sortedPodium[2]].map(
        (user, idx) =>
          user && (
            <View key={user.name} className="flex-1 pb-4 items-center" style={{maxWidth: 82}}>
              {user === sortedPodium[0] && (
                <Text style={{fontSize: 28}} className="mb-1">
                  👑
                </Text>
              )}
              <Image source={{uri: user.avatar}} className="w-16 h-16 rounded-full border-4 border-white mb-2" />

              <LinearGradient
                colors={rankGradients[user.rank] || ['#888', '#555']}
                style={{
                  width: '100%',
                  height: getHeight(user.rank),
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text className="text-lg font-bold text-white">{user.rank}</Text>
              </LinearGradient>

              {/* User Info */}
              <Text className="text-sm font-bold text-white mt-1">{user.name}</Text>
              <Text className="text-sm text-white/80">{user.points} pts</Text>
            </View>
          ),
      )}
    </View>
  );
};

export default Podium;
