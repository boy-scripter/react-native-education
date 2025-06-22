import { errorToast } from '@components/Toast/Toast.config';
import { useStorage } from '@hooks/useStorage.hook';
import { REFRESH_TOKEN } from '@myTypes/auth';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"


const { getItem } = useStorage();

const baseQuery = graphqlRequestBaseQuery({
    url: process.env.GRAPHQL_BASE_URL!,
    prepareHeaders: (headers) => {
      const token = getItem<string>(REFRESH_TOKEN);
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  })


export const baseQueryWithErrorToast: BaseQueryFn<any, unknown, unknown> = async ( args,  api, extraOptions ) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const errorMessage = result.error?.message || 'Something went wrong';

    errorToast({
      text1: 'Error',
      text2: errorMessage,
    });
  }

  return result;
};

 
export const baseApi = createApi({
  baseQuery : baseQueryWithErrorToast ,
  endpoints: (build) => ({})
});


