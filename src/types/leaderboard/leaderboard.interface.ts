import { GlobalLeaderboardQuery } from '@/store/leaderboard/endpoint';

export enum TimeRange {
  Last24Hours = 'last24hours',
  Last7Day = 'last7day',
  Last30Day = 'last30day',
}

export type LeaderBoardUser = GlobalLeaderboardQuery['globalLeaderboard']['0']