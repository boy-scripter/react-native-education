import {useState, useCallback} from 'react';

interface PaginatedProps<TFilter, Docs> {
  query: (args: {page: number; limit: number; filter?: TFilter}) => Promise<PaginatedResponse<Docs>>;
}

interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  prevPage?: number;
}

export function usePaginatedHook<Docs, TFilter = any>({
  query,
}: PaginatedProps<TFilter, Docs>) {
  const [data, setData] = useState<PaginatedResponse<Docs> | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<TFilter | undefined>(undefined);

  const fetchPage = useCallback(
    async (page = 1, limit = 10, filter?: TFilter) => {
      setLoading(true);
      try {
        // If a filter is passed, update stored filter
        if (filter !== undefined) {
          setCurrentFilter(filter);
        }
        const result = await query({
          page,
          limit,
          filter: filter !== undefined ? filter : currentFilter,
        });

        setData(prev => {
          if (!prev || page === 1) return result; // Reset docs on first page
          return {
            ...result,
            docs: [...prev.docs, ...result.docs], // Append new docs
          };
        });
      } finally {
        setLoading(false);
      }
    },
    [query, currentFilter]
  );

  const nextPage = useCallback(() => {
    if (data?.hasNextPage && data.nextPage) {
      fetchPage(data.nextPage, data.limit);
    }
  }, [data, fetchPage]);

  const prevPage = useCallback(() => {
    if (data?.hasPrevPage && data.prevPage) {
      fetchPage(data.prevPage, data.limit);
    }
  }, [data, fetchPage]);

  return {
    docs: data?.docs ?? [],
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 0,
    totalDocs: data?.totalDocs ?? 0,
    hasNextPage: data?.hasNextPage ?? false,
    hasPrevPage: data?.hasPrevPage ?? false,
    nextPage,
    prevPage,
    fetchPage,
    loading,
    currentFilter, // exposing current filter if needed
  };
}
