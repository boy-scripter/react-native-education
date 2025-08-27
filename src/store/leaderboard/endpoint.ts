import { api } from '@/graphql/generated';

const leaderBoardApi = api.enhanceEndpoints({
    addTagTypes: ['leaderboard'],
    endpoints: {
        PersonalLeaderboard: {
            providesTags: () => ['leaderboard'],
            keepUnusedDataFor: 60,
        },
        GlobalLeaderboard: {
            providesTags: () => ['leaderboard'],
            keepUnusedDataFor: 60,
        },
        RefreshLeaderBoard: {
            
        },
    },
})



export const {
    usePersonalLeaderboardQuery, useGlobalLeaderboardQuery,
    useLazyPersonalLeaderboardQuery, useLazyGlobalLeaderboardQuery,
    useRefreshLeaderBoardQuery, useLazyRefreshLeaderBoardQuery
} = leaderBoardApi