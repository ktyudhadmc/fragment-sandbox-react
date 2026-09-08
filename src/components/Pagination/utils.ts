export type PaginationRangeItem = number | "...";

/**
 * Builds a compact page-number range like [1, "...", 4, 5, 6, "...", 20],
 * always keeping the first and last page visible plus `siblingCount`
 * neighbors around the current page.
 */
export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): PaginationRangeItem[] {
  const totalSlots = siblingCount * 2 + 5; // first + last + current + 2 dots + siblings

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const range: PaginationRangeItem[] = [1];

  if (showLeftDots) range.push("...");

  const start = showLeftDots ? leftSibling : 2;
  const end = showRightDots ? rightSibling : totalPages - 1;
  for (let page = start; page <= end; page++) {
    range.push(page);
  }

  if (showRightDots) range.push("...");

  range.push(totalPages);

  return range;
}
