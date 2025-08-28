
import { api } from "@/graphql/generated";


 const categoryApi = api.enhanceEndpoints({
    addTagTypes: ['category'],
    endpoints: {
        Categories: {
            keepUnusedDataFor: Number.NEGATIVE_INFINITY
        }
    }
})

export const { useCategoriesQuery, useLazyCategoriesQuery } = categoryApi;
export { categoryApi }
export type { CategoriesQuery } from "@/graphql/generated";
