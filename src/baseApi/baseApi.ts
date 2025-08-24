import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { API_URL } from '@env';
import { RootState } from '@store/store';
import { DocumentNode } from 'graphql';
import { errorToast } from '@components/Toast/Toast.config';
import { refreshTokenAction, waitForMutex, isMutexLocked } from './refreshAction';

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


export const reAuthBaseQuery: BaseQueryType = async (args, api, extraOptions) => {
  await waitForMutex();

  let result = await baseQuery(args, api, extraOptions);
  handleGeneralError(result.error, extraOptions?.skipToast);

  // Handle unauthorized errors
  if (result.error?.message.toLowerCase() === 'unauthorized') {
    if (!isMutexLocked()) {
      const newAccessToken = await refreshTokenAction();
      if (!newAccessToken) return result;
      result = await baseQuery(args, api, extraOptions);
    } else {
      await waitForMutex();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};


export const baseApi = createApi({
  baseQuery: reAuthBaseQuery,
  endpoints: (_) => ({}),
});

interface ExtraOptions {
  skipToast?: boolean;
}

type BaseQueryType = BaseQueryFn<{ document: string | DocumentNode; variables?: any }, unknown, { message: string; status: number | undefined }, ExtraOptions>;