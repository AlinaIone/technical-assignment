import { useMemo } from "react";
import { range } from "../utils/rangeFunction";

export const usePagination = (
  activePage,
  siblingCount,
  pagesToShow,
  totalPageNr
) => {
  const paginationRange = useMemo(() => {
    // Pagination type: 1 2 3 4 5
    if (pagesToShow >= totalPageNr) {
      return [...range(1, totalPageNr), totalPageNr];
    }

    const leftSiblingIndex = Math.max(activePage - siblingCount, 1);
    const rightSiblingIndex = Math.min(activePage + siblingCount, totalPageNr);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageNr - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageNr;

    // Pagination type: 1 2 3 4 ....200
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 2 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "...", totalPageNr];
    }

    // Paginatiom type: 1 ... 197 198 199 200
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = range(totalPageNr - rightItemCount + 1, totalPageNr);

      return [firstPageIndex, "...", ...rightRange];
    }

    // Pagination type: 1 ... 4 5 6 ... 200
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  }, [activePage, pagesToShow, siblingCount, totalPageNr]);

  return paginationRange;
};
