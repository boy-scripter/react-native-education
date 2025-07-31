import {api} from '@/graphql/generated';

export const pdfApi = api;

export const {useLazyGetPdfsQuery, useGetPdfsQuery} = pdfApi;
export type {PaginatedPdfResponse , Pdf} from '@/graphql/generated';
