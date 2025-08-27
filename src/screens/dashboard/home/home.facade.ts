import { useState, useCallback } from 'react';
import { CategoriesQuery, useLazyCategoriesQuery } from '@/store/category/endpoint';
import { PersonalLeaderboardQuery, useLazyPersonalLeaderboardQuery } from '@/store/leaderboard/endpoint';

type HomeData = {
  categories: CategoriesQuery['categories'];
  personalLeaderboard: PersonalLeaderboardQuery['personalLeaderboard']; // replace with proper type
};

export function useHomeFacade() {
  const [categoryQuery] = useLazyCategoriesQuery();
  const [personalLeaderboardQuery] = useLazyPersonalLeaderboardQuery();

  const [data, setData] = useState<HomeData>({
    categories: [],
    personalLeaderboard: undefined,
  });

  const onInitialPageRender = useCallback(
    async () => {
      const [categoryData, leaderboardData] = await Promise.all([
        categoryQuery().unwrap(),
        personalLeaderboardQuery().unwrap(),
      ]);

      setData({
        categories: categoryData.categories,
        personalLeaderboard: leaderboardData.personalLeaderboard,
      });

    }, [categoryQuery, personalLeaderboardQuery]);

  return {
    onInitialPageRender,
    ...data,
  };
}
