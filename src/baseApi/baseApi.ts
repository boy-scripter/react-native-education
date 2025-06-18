import { useStorage } from '@hooks/useStorage.hook';
import { ACCESS_TOKEN_KEY } from '@myTypes/auth';
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"

const { getItem } = useStorage();

export const baseApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: process.env.GRAPHQL_BASE_URL!,
    prepareHeaders: (headers) => {
      const token = getItem<string>(ACCESS_TOKEN_KEY);
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({})
});


