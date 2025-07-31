
import { api } from "@/graphql/generated";

export const categoryApi = api

export const { useCategoriesQuery , useLazyCategoriesQuery  } = categoryApi;
export type { CategoriesQuery  } from "@/graphql/generated";
