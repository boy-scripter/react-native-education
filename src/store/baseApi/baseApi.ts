import { GraphQLClient } from 'graphql-request';
import { useStorage } from '@hooks/useStorage.hook';
import { ACCESS_TOKEN_KEY } from '@myTypes/auth';
import { createApi } from '@reduxjs/toolkit/query'
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"

const { getItem } = useStorage();
const AuthHeaders = getItem(ACCESS_TOKEN_KEY) ? { 'authorization': `Bearer ${getItem(ACCESS_TOKEN_KEY)}` } : {};

const graphqlClient = new GraphQLClient(process.env.GRAPHQL_API_URL!, {
    headers: AuthHeaders
})


const baseApi = createApi({
 baseQuery
})