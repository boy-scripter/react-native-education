import { useState, useCallback } from 'react';
import { CategoriesQuery, useLazyCategoriesQuery } from '@/store/category/endpoint';
import { useLazyPersonalLeaderboardQuery } from '@/store/leaderboard/endpoint';

export function useHomeFacade() {
  const [categoryQuery] = useLazyCategoriesQuery();
  const [personalLeaderboardQuery] = useLazyPersonalLeaderboardQuery();

  const [categories, setCategories] = useState<CategoriesQuery['categories']>([]);


  const onInitialPageRender = useCallback(
    async () => {
      const [categoryData, leaderboardData] = await Promise.all([
        categoryQuery().unwrap(),
        personalLeaderboardQuery().unwrap()
      ]);

      setCategories(categoryData.categories);
    }, []);

  return {
    onInitialPageRender,
    categories,
  };
}
