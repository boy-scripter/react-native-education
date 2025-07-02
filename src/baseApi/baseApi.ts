import { errorToast } from '@components/Toast/Toast.config';
import { useStorage } from '@hooks/useStorage.hook';
import { REMEMBER_ME } from '@myTypes/auth';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { GRAPHQL_BASE_URL } from "@env"
import { Mutex } from 'async-mutex'
import { api as authApi } from '@/graphql/generated';
import { RootState } from '@/store/store';
import { selectAuth } from '@/store/auth/auth.selector';
import { logout } from '@/store/auth/auth.slice';


const { getItem } = useStorage();
const mutex = new Mutex()
const baseQuery = graphqlRequestBaseQuery({
  url: GRAPHQL_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getItem<string>(REMEMBER_ME);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
  customErrors: ({ response }) => {
    const err = response.errors?.[0];
    return {
      message: err?.message ?? 'Unknown Server error',
      status: err?.extensions?.status as number | undefined,
    }
  }
})


export const baseQueryWithReAuth: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  // Wait if there's already a token refresh in progress
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  // Handle general errors
  if (result.error && result.error.status !== 401) {
    const errorMessage = result.error?.message || 'Something went wrong';
    errorToast({ text1: errorMessage });
  }

  // If token expired (401), attempt refresh
  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const refresh_token = selectAuth(state).refresh_token;

    if (!refresh_token) {
      api.dispatch(logout());
      return result;
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        await api.dispatch(authApi.endpoints.RefreshToken.initiate({ token: refresh_token })).unwrap();

        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } catch {
        api.dispatch(logout());
      } finally {
        release();
      }
    } else {
      // Wait for the ongoing refresh to finish and retry
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};



export const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({})
});


