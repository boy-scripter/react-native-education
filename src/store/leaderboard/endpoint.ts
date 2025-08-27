import { api } from '@/graphql/generated';
import { useStorage } from '@/hooks';


const { getItem, setItem } = useStorage();
const leaderBoardApi = api.enhanceEndpoints({
    addTagTypes: ['leaderboard'],
    endpoints: {
        PersonalLeaderboard: {
            providesTags: ['leaderboard'],
            keepUnusedDataFor: Number.POSITIVE_INFINITY
        },
        GlobalLeaderboard: {
            providesTags: (result, error, arg) => [{ type: 'leaderboard', id: JSON.stringify(arg) }],
            keepUnusedDataFor: Number.POSITIVE_INFINITY
        },
        RefreshLeaderBoard: {
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                const next = parseInt(data.refreshLeaderBoard.nextRefreshAt, 10);

                let localLastRefreshed = getItem<string | undefined>('lastRefreshedAt');
                let lastRefreshed = localLastRefreshed ? parseInt(localLastRefreshed, 10) : 0;

                if (next > lastRefreshed) {
                    setItem('lastRefreshedAt', Date.now().toString());
                    dispatch(leaderBoardApi.util.invalidateTags(['leaderboard']));
                }
            }

        }
    }
})



export const {
    usePersonalLeaderboardQuery, useGlobalLeaderboardQuery,
    useLazyPersonalLeaderboardQuery, useLazyGlobalLeaderboardQuery,
    useRefreshLeaderBoardQuery, useLazyRefreshLeaderBoardQuery
} = leaderBoardApi

export type { PersonalLeaderboardQuery , GlobalLeaderboardQuery } from '@/graphql/generated'