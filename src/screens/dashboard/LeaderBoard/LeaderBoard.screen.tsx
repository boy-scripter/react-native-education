import React from 'react';
import {View, ScrollView} from 'react-native';
import TabToggleWrapper from './TabToggleWrapper';
import Podium from './Podium';
import LeaderboardList from './LeaderboardList';
import LinearGradient from 'react-native-linear-gradient';
import {TimeRange} from '@myTypes/leaderboard/leaderboard.interface';
import {useLeaderBoardFacade} from './useLeaderBoardFacade'; // Adjust path as needed
import RefreshCountdown from './RefreshCountDown';

const LeaderBoardScreen: React.FC = () => {
  const {podiumData, leaderboardData, fetchLeaderboardData} = useLeaderBoardFacade();
  const handleTabChange = (tabId: TimeRange) => fetchLeaderboardData(tabId);

  return (
    <View className="flex-1">
      <View>
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} className="h-96 w-full relative pb-2 rounded-2xl">
          <TabToggleWrapper
            tabs={[
              {id: TimeRange.Last24Hours, label: '24 hour'},
              {id: TimeRange.Last7Day, label: '7 day'},
              {id: TimeRange.Last30Day, label: '30 day'},
            ]}
            activeTab={TimeRange.Last24Hours}
            onTabChange={(id: TimeRange) => handleTabChange(id)}
          />
          <Podium podiumData={podiumData} />
        </LinearGradient>
      </View>
     
      <ScrollView className="flex-1 bg-gray-50 rounded-t-3xl -mt-5" showsVerticalScrollIndicator={false}>
          <RefreshCountdown></RefreshCountdown>
        <LeaderboardList leaderboardData={leaderboardData} />
      </ScrollView>
    </View>
  );
};

export default LeaderBoardScreen;
