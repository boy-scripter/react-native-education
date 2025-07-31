import {usePaginatedHook} from '@hooks/usePaginated.hook';
import {useLazyGetPdfsQuery, PaginatedPdfResponse, Pdf} from '@/store/pdf/endpoint';
import {useCallback} from 'react';

export function usePdfFacade() {
  const [fetchPdfs] = useLazyGetPdfsQuery();

  const pagintedPdf = usePaginatedHook<Omit<Pdf, 'category'>>({
    query: async ({page, limit, filter}) => {
      const response = await fetchPdfs({page, limit, filter}).unwrap();
      return response.pdfs;
    },
  });

  const onInitialPageRender = useCallback(
    (categoryId?: string) => {
      return pagintedPdf.fetchPage(1, 10, categoryId ? {category: categoryId} : undefined);
    },
    [pagintedPdf.fetchPage],
  );

  return {
    onInitialPageRender,
    pagintedPdf,
  };
}
