import { errorToast } from '@components/Toast/Toast.config';
import { useStorage } from '@hooks/useStorage.hook';
import { AuthenticatedUser, REMEMBER_ME } from '@myTypes/auth';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { GRAPHQL_BASE_URL } from "@env"
import { Mutex } from 'async-mutex'
import { authApi } from '@store/auth/endpoints';
import { RootState } from '@store/store';
import { selectAuth } from '@store/auth/auth.selector';
import { logout } from '@store/auth/auth.slice';
import { DocumentNode } from 'graphql';


const { getItem } = useStorage();
const mutex = new Mutex()

const baseQuery  = graphqlRequestBaseQuery({
  url: GRAPHQL_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getItem<AuthenticatedUser>(REMEMBER_ME)?.access_token;
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
            console.log('reached here')
            await api.dispatch(
              authApi.endpoints.RefreshToken
              .initiate({ token: refresh_token }))
              .unwrap();
          
          console.log('reached not here')
          // code not woeking here why
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
  baseQuery: finalBaseQuery,
  endpoints: (build) => ({})
});


interface ExtraOptions {
  skipToast?: boolean
}

type BaseQueryType = BaseQueryFn<{
  document: string | DocumentNode;
  variables?: any;
}, unknown, {
  message: string;
  status: number | undefined;
}, ExtraOptions>