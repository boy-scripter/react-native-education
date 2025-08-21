import { errorToast } from '@components/Toast/Toast.config';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { API_URL } from '@env';
import { Mutex } from 'async-mutex';
import { RootState } from '@store/store';
import { selectAuth } from '@store/auth/auth.selector';
import { logout, setAccessToken } from '@store/auth/auth.slice';
import { DocumentNode } from 'graphql';

const mutex = new Mutex();
const REFRESH_TOKEN_DOCUMENT = `
mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    message
    access_token
  }
}
`;

const baseQuery = graphqlRequestBaseQuery({
  url: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.access_token;
    token && headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
  customErrors: ({ response }) => {
    const err = response.errors?.[0];
    return {
      message: err?.message ?? 'Unknown Server error',
      status: err?.extensions?.status as number | undefined,
    };
  },
}) as BaseQueryType;



const handleGeneralError = (error: any, skipToast?: boolean) => {
  if (!error || skipToast) return;
  const errorMessage = error.message || 'Something went wrong';
  errorToast({ text1: errorMessage });
};



const refreshToken = async (api: any, refresh_token: string) => {
  const release = await mutex.acquire();
  try {
    const refreshResult = await baseQuery({
      document: REFRESH_TOKEN_DOCUMENT,
      variables: { token: refresh_token },
    }, api, { skipToast: true });

    const newAccessToken = (refreshResult?.data as any)?.refreshToken?.access_token;
    if (!newAccessToken) {
      errorToast({ text1: 'Failed to refresh token' });
      api.dispatch(logout());
      return null;
    }

    api.dispatch(setAccessToken(newAccessToken));
    return newAccessToken;

  } catch {

    api.dispatch(logout());
    return null;

  } finally {

    release();

  }
};

export const finalBaseQuery: BaseQueryType = async (args, api, extraOptions: ExtraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  handleGeneralError(result.error, extraOptions?.skipToast);

  if (result.error?.message.toLowerCase() === 'unauthorized') {
    const state = api.getState() as RootState;
    const refresh_token = selectAuth(state).refresh_token;

    if (!refresh_token) {
      api.dispatch(logout());
      return result;
    }

    if (!mutex.isLocked()) {
      const newAccessToken = await refreshToken(api, refresh_token);
      if (!newAccessToken) return result;
      result = await baseQuery(args, api, extraOptions);
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: finalBaseQuery,
  endpoints: (_) => ({}),
});

interface ExtraOptions {
  skipToast?: boolean;
}

type BaseQueryType = BaseQueryFn<{ document: string | DocumentNode; variables?: any }, unknown, { message: string; status: number | undefined }, ExtraOptions>;