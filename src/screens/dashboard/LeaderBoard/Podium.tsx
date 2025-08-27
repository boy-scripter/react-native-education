import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LeaderBoardUser} from '@myTypes/leaderboard/leaderboard.interface';
import Img from '@/components/ui/Img';
import ProfileImage from '@assets/images/profile.png';

const rankGradients: Record<number, string[]> = {
  1: ['#FFD700', '#FFC700'], // Gold
  2: ['#C0C0C0', '#A9A9A9'], // Silver
  3: ['#CD7F32', '#B76C3B'], // Bronze
};

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

interface PodiumProps {
  podiumData: LeaderBoardUser[];
}

const Podium: React.FC<PodiumProps> = ({podiumData}) => {
  const sortedPodium = [...podiumData].sort((a, b) => {
    const rankOrder = [2, 1, 3]; // display order
    return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
  });

  return (
    <View className="flex-row flex-1 items-center justify-center px-4 gap-5 z-10 w-full">
      <Text className='text-white font-black text-2xl'> {!sortedPodium.length && 'No Data Found'}</Text>
      {sortedPodium.map(details => (
        <View key={details.rank} className="flex-1 pb-4 items-center" style={{maxWidth: 82}}>
          {details.rank === 1 && (
            <Text style={{fontSize: 28}} className="mb-1">
              👑
            </Text>
          )}
          <Img fallbackUri={ProfileImage} source={details.userId.avatar} className="w-16 h-16 rounded-full border-4 overflow-hidden border-white mb-2" />
          <LinearGradient
            colors={rankGradients[details.rank] || ['#888', '#555']}
            style={{
              width: '100%',
              height: getHeight(details.rank),
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text className="text-lg font-bold text-white">{details.rank}</Text>
          </LinearGradient>

          <Text className="text-sm font-bold text-white mt-1">{details.userId.name}</Text>
          <Text className="text-sm text-white/80">{details.totalPoints} pts</Text>
        </View>
      ))}
    </View>
  );
};

export default Podium;
