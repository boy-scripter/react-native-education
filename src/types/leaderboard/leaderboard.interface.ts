export interface TimeRange {
  from: string;
  to: string;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface PodiumUser {
  rank: 1 | 2 | 3;
  name: string;
  points: number;
  color: string;
  avatar: string;
  icon: string;
  isWinner?: boolean;
}

export interface LeaderboardUser {
  name: string;
  points: number;
  avatar: string;
}