import React, {useEffect, useState} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import TabToggleWrapper from './TabToggleWrapper';
import Podium from './Podium';
import LeaderboardList from './LeaderboardList';
import {PodiumUser, LeaderboardUser, TimeRange} from '@myTypes/leaderboard/leaderboard.interface';
import LinearGradient from 'react-native-linear-gradient';

const LeaderBoardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [podiumData, setPodiumData] = useState<PodiumUser[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);

  const getTimeRange = (period: 'daily' | 'weekly' | 'monthly'): TimeRange => {
    const now = new Date();
    let fromDate: Date;

    switch (period) {
      case 'daily':
        fromDate = new Date(now);
        fromDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        fromDate = new Date(now);
        fromDate.setMonth(now.getMonth() - 1);
        break;
    }

    return {from: fromDate.toISOString(), to: now.toISOString(), period};
  };

  const handleTabChange = (tabId: string) => {
    const validTab = tabId as 'daily' | 'weekly' | 'monthly';
    setActiveTab(validTab);
  };

  const dummyPodiumData: PodiumUser[] = [
    {
      rank: 2,
      name: 'Alex Johnson',
      points: 245,
      color: '#10b981',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      icon: 'https://img.icons8.com/fluency/48/medal2.png',
    },
    {
      rank: 1,
      name: 'Sarah Wilson',
      points: 320,
      color: '#facc15',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b633?w=150&h=150&fit=crop&crop=face',
      icon: 'https://img.icons8.com/fluency/48/trophy.png',
      isWinner: true,
    },
    {
      rank: 3,
      name: 'Mike Chen',
      points: 198,
      color: '#fb923c',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      icon: 'https://img.icons8.com/fluency/48/award.png',
    },
  ];

  const dummyLeaderboardData: LeaderboardUser[] = [
    {name: 'David Kim', points: 187, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'},
    {name: 'Emma Davis', points: 165, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b633?w=150&h=150&fit=crop&crop=face'},
    {name: 'James Wilson', points: 142, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'},
    {name: 'Lisa Zhang', points: 139, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'},
    {name: 'Tom Brown', points: 125, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'},
    {name: 'Anna Lee', points: 118, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'},
    {name: 'Chris Taylor', points: 108, avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face'},
    {name: 'Maya Patel', points: 95, avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'},
  ];

  // Fetch leaderboard data from API
  // Replace fetchLeaderboardData with dummy assignment
  const fetchLeaderboardData = async () => {
    const timeRange = getTimeRange(activeTab);
    console.log('Using dummy data for time range:', timeRange);

    // Simulate async fetch
    setTimeout(() => {
      setPodiumData(dummyPodiumData);
      setLeaderboardData(dummyLeaderboardData);
    }, 500); // 0.5s delay to mimic network
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [activeTab]);

  return (
    <View className="flex-1 ">
      <View className=''>
        <LinearGradient
          colors={['#0f2027', '#203a43', '#2c5364']} // dark teal/blue gradient
          className="h-96 w-full relative pb-5 rounded-2xl">
          {/* <TabToggleWrapper
          tabs={[
            {id: 'daily', label: 'Daily'},
            {id: 'weekly', label: 'Weekly'},
            {id: 'monthly', label: 'Monthly'},
          ]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        /> */}
          <Podium podiumData={podiumData} />
        </LinearGradient>
      </View>

      <ScrollView className="flex-1 bg-gray-50 rounded-t-3xl -mt-5" showsVerticalScrollIndicator={false}>
        <LeaderboardList leaderboardData={leaderboardData} />
      </ScrollView>
    </View>
  );
};

export default LeaderBoardScreen;
