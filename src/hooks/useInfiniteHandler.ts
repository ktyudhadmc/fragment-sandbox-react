import { useEffect, useState } from "react";

export interface InfinitePaginationMeta {
  current_page: number;
  last_page: number;
}

export interface UseInfiniteHandlerProps<T> {
  /** Latest page of results from your fetch (e.g. `data` from a paginated API response). */
  data?: T[];
  pagination?: InfinitePaginationMeta;
  loading: boolean;
  setPageNum: (page: number) => void;
}

/**
 * Accumulates paginated API pages into one flat list — for "Load more" /
 * infinite-scroll lists backed by page-number pagination (page 1 replaces
 * the list, subsequent pages append).
 */
export function useInfiniteHandler<T>({ data, pagination, loading, setPageNum }: UseInfiniteHandlerProps<T>) {
  const [list, setList] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!data) return;
    // Accumulates each fetched page from the external API response into one list.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setList((prev) => (pagination?.current_page === 1 ? data : [...prev, ...data]));
  }, [data, pagination?.current_page]);

  useEffect(() => {
    if (!pagination) return;
    // Derives hasMore from the latest external pagination metadata.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMore(pagination.current_page < pagination.last_page);
  }, [pagination]);

  const loadMore = () => {
    if (loading || !pagination) return;
    if (pagination.current_page < pagination.last_page) {
      setPageNum(pagination.current_page + 1);
    }
  };

  const reset = () => {
    setList([]);
    setHasMore(true);
    setPageNum(1);
  };

  return { list, hasMore, loadMore, reset };
}
