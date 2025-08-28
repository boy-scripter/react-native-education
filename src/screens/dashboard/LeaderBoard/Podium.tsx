import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LeaderBoardUser} from '@myTypes/leaderboard/leaderboard.interface';
import Img from '@/components/ui/Img';
import ProfileImage from '@assets/images/profile.png';
import MessageIcon from '@assets/images/message.png'; // Placeholder icon

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
  const allRanks = [2, 1, 3]; // display order (middle first)
  const sortedPodium = allRanks.map(rank => podiumData.find(d => d.rank === rank));

  return (
    <View className="flex-row flex-1 items-end justify-center px-4 gap-5 z-10 w-full">
      {sortedPodium.map((details, index) => (
        <View key={allRanks[index]} className="flex-1 pb-4 items-center" style={{maxWidth: 82}}>
          {details ? (
            <>
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
                <Text className="text-2xl font-bold text-white">{details.rank}</Text>
              </LinearGradient>

              <Text className="text-sm font-bold text-white mt-1">{details.userId.name}</Text>
              <Text className="text-sm text-white/80">{details.totalPoints} pts</Text>
            </>
          ) : (
            // Placeholder for missing rank
            <>
              <Img source={ProfileImage} className="w-16 h-16 rounded-full border-4 overflow-hidden border-white mb-2" />
              <LinearGradient
                colors={['#86ab6f', '#69be80']}
                style={{
                  width: '100%',
                  height: getHeight(allRanks[index]),
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text className="text-white text-xl">N/A</Text>
              </LinearGradient>

              <Text className="text-sm font-bold text-white mt-1">No Data</Text>
              <Text className="text-sm text-white/80">—</Text>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

export default Podium;
