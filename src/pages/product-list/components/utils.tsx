import { FilterAndSortOptions } from "@/pages/product-list/components/types";

export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | "ellipsis")[] = [];

  const addPage = (page: number) => {
    if (!pages.includes(page) && page >= 1 && page <= totalPages) {
      pages.push(page);
    }
  };

  // Always show first two
  addPage(1);
  addPage(2);

  // Previous, current, next
  addPage(currentPage - 1);
  addPage(currentPage);
  addPage(currentPage + 1);

  // Always show last two
  addPage(totalPages - 1);
  addPage(totalPages);

  // Sort pages
  pages.sort((a, b) => (a === "ellipsis" || b === "ellipsis" ? 0 : a - b));

  // Insert ellipses
  const finalPages: (number | "ellipsis")[] = [];
  for (let i = 0; i < pages.length; i++) {
    if (i === 0) {
      finalPages.push(pages[i]);
      continue;
    }

    if (typeof pages[i] === "number" && typeof pages[i - 1] === "number") {
      if ((pages[i] as number) - (pages[i - 1] as number) > 1) {
        finalPages.push("ellipsis");
      }
    }

    finalPages.push(pages[i]);
  }

  return finalPages;
};

export const handleNextPage = (
  e: React.MouseEvent<HTMLAnchorElement>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number,
  totalPages: number,
  filters: FilterAndSortOptions | undefined,
  setSearchParams: (params: Record<string, string>) => void,
  sortBy: string,
) => {
  e.preventDefault();

  const newPage = currentPage + 1 < totalPages ? currentPage + 1 : totalPages;
  setCurrentPage(newPage);

  const params: Record<string, string> = { page: String(newPage) };

  if (filters?.priceFrom) {
    params.priceFrom = filters.priceFrom;
  }
  if (filters?.priceTo) {
    params.priceTo = filters.priceTo;
  }
  if (sortBy) {
    params.sort = sortBy;
  }
  setSearchParams(params);
};

export const handlePreviousPage = (
  e: React.MouseEvent<HTMLAnchorElement>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number,
  totalPages: number,
  filters: FilterAndSortOptions | undefined,
  setSearchParams: (params: Record<string, string>) => void,
) => {
  e.preventDefault();
  const newPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  setCurrentPage(newPage);

  const params: Record<string, string> = { page: String(newPage) };

  if (filters?.priceFrom) {
    params.priceFrom = filters.priceFrom;
  }
  if (filters?.priceTo) {
    params.priceTo = filters.priceTo;
  }
  setSearchParams(params);
};
