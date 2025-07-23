import { errorToast } from '@components/Toast/Toast.config';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { GRAPHQL_BASE_URL } from "@env"
import { Mutex } from 'async-mutex'
import { RootState } from '@store/store';
import { selectAuth } from '@store/auth/auth.selector';
import { logout, setAccessToken } from '@store/auth/auth.slice';
import { DocumentNode } from 'graphql';

const mutex = new Mutex()
const REFRESH_TOKEN_DOCUMENT = `
mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    message
    access_token
  }
}
`;

const baseQuery = graphqlRequestBaseQuery({
  url: GRAPHQL_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
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
}) as BaseQueryType


export const finalBaseQuery: BaseQueryType = async (args, api, extraOptions: ExtraOptions) => {
  // Wait if there's already a token refresh in progress
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  // Handle general errors
  if (result.error && !(extraOptions?.skipToast)) {
    const errorMessage = result.error?.message || 'Something went wrong';
    errorToast({ text1: errorMessage });
  }

  // If token expired (401), attempt refresh
  if (result.error?.message.toLowerCase() === 'unauthorized') {

    const state = api.getState() as RootState;
    const refresh_token = selectAuth(state).refresh_token;

    if (!refresh_token) {
      api.dispatch(logout());
      return result;
    }

    if (!mutex.isLocked()) {

      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery({
          document: REFRESH_TOKEN_DOCUMENT,
          variables: { token: refresh_token }
        }, api, { skipToast: true });

        // Assuming the access_token is returned under refreshResult.data.refreshToken
        const newAccessToken = (refreshResult?.data as any)?.refreshToken?.access_token;
        if (!newAccessToken) throw new Error("Failed to refresh access token");

        // Update the access token in the state
        api.dispatch(setAccessToken(newAccessToken));

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
  baseQuery: finalBaseQuery,
  endpoints: (build) => ({})
});


interface ExtraOptions {
  skipToast?: boolean
}

type BaseQueryType = BaseQueryFn<{ document: string | DocumentNode; variables?: any }, unknown, { message: string; status: number | undefined }, ExtraOptions>