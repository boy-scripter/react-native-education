import { errorToast } from '@components/Toast/Toast.config';
import { useStorage } from '@hooks/useStorage.hook';
import { REMEMBER_ME } from '@myTypes/auth';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { GRAPHQL_BASE_URL } from "@env"

const { getItem } = useStorage();

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


export const baseQueryWithErrorToast: BaseQueryFn<any, unknown, unknown> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const errorMessage = result.error?.message || 'Something went wrong';
    errorToast({ text1: errorMessage });
  }

  return result;
};


export const baseApi = createApi({
  baseQuery: baseQueryWithErrorToast,
  endpoints: (build) => ({})
});


