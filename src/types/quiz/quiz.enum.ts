export { GameModeType, GameResult  } from '@/graphql/generated'

export enum GameStatus {
  WAITING = 'waiting',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}