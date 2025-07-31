import {useState, useCallback} from 'react';
import {CategoriesQuery, useLazyCategoriesQuery} from '@/store/category/endpoint';

export function useHomeFacade() {
  const [categoryQuery] = useLazyCategoriesQuery();
  const [categories, setCategories] = useState<CategoriesQuery['categories']>([]);

  const onInitialPageRender = useCallback(async () => {
    const data = await categoryQuery().unwrap();
    setCategories(data.categories);
  }, []);

  return {
    onInitialPageRender,
    categories,
  };
}
