import { useState } from "react";

/**
 * Page-number state management (companion to the visual <Pagination>
 * component, which is a controlled/presentational component — use this hook
 * when you'd rather manage the page state imperatively).
 */
export function usePagination(maxPageNum: number) {
  const [pageNum, setPageNum] = useState(1);

  const goNextPage = () => {
    if (pageNum < maxPageNum) setPageNum((prev) => prev + 1);
  };

  const goPrevPage = () => {
    if (pageNum > 1) setPageNum((prev) => prev - 1);
  };

  const goPageNum = (page: number) => setPageNum(page);

  const resetPage = () => setPageNum(1);

  return {
    currentPage: pageNum,
    setPageNum,
    goNextPage,
    goPrevPage,
    resetPage,
    goPageNum,
  };
}
