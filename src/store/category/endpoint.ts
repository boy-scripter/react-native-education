
import { api } from "@/graphql/generated";


export const categoryApi = api.enhanceEndpoints({
    addTagTypes: ['category'],
    endpoints: {
        Categories: {
            keepUnusedDataFor: Infinity
        }
    }
})

export const { useCategoriesQuery, useLazyCategoriesQuery } = categoryApi;
export type { CategoriesQuery } from "@/graphql/generated";
