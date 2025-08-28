import { useState, useCallback, useEffect } from 'react';
import { LeaderBoardUser, TimeRange } from '@myTypes/leaderboard/leaderboard.interface';
import { useLazyGlobalLeaderboardQuery, useLazyRefreshLeaderBoardQuery } from '@/store/leaderboard/endpoint';

type LeaderBoardState = {
  podiumData: LeaderBoardUser[];
  leaderboardData: LeaderBoardUser[];
};

const getTimeRange = (period: TimeRange): { gt: string } => {
  const now = new Date();
  let fromDate = new Date();

  switch (period) {
    case TimeRange.Last24Hours:
      fromDate.setHours(now.getHours() - 24);
      fromDate.setMinutes(0, 0, 0);
      break;

    case TimeRange.Last7Day:
      fromDate.setDate(now.getDate() - 7);
      fromDate.setMinutes(0, 0, 0);
      break;

    case TimeRange.Last30Day:
      fromDate.setMonth(now.getMonth() - 1);
      fromDate.setMinutes(0, 0, 0);
      break;
  }


  return { gt: fromDate.toISOString() };
};

export function useLeaderBoardFacade() {
  const [leaderboardQuery] = useLazyGlobalLeaderboardQuery();
  const [state, setState] = useState<LeaderBoardState>({
    podiumData: [],
    leaderboardData: [],
  });

  const fetchLeaderboardData = useCallback(
    async (period: TimeRange) => {

      const dateRange = getTimeRange(period);
      const response = await leaderboardQuery({
        input: { createdAt: dateRange }
      }, true).unwrap();

      const fullList = response.globalLeaderboard || [];
      const sortedList = [...fullList].sort((a, b) => a.rank - b.rank);

      const podiumData = sortedList.slice(0, 3);
      const leaderboardData = sortedList.slice(3);

      setState({
        podiumData,
        leaderboardData,
      });
    },
    [leaderboardQuery]
  );

  useEffect(
    () => {
      fetchLeaderboardData(TimeRange.Last24Hours);
    }, [])

  return {
    ...state,
    fetchLeaderboardData
  };
}
