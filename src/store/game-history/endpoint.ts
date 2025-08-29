
import { api } from '@/graphql/generated';


export const gameHistoryApi = api;


export const { useGameHistoryByIdQuery, useLazyGameHistoryByIdQuery } = gameHistoryApi
export type { GameHistoryByIdQuery } from '@/graphql/generated'

