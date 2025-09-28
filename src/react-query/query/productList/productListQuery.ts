import { getList } from "../../../api/productList/productList";
import { useQuery } from "@tanstack/react-query";

type SortOption = "price" | "created_at" | "-price" | "";

export const useGetList = (
  page: number,
  priceFrom: string | undefined,
  priceTo: string | undefined,
  sortBy: SortOption,
) => {
  return useQuery({
    queryKey: ["get-list", page, priceFrom, priceTo, sortBy],
    retry: 1,
    queryFn: () => getList(page, priceFrom, priceTo, sortBy),
  });
};
