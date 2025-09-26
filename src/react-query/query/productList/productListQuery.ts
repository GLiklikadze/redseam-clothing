import { getList } from "../../../api/productList/productList";
import { useQuery } from "@tanstack/react-query";

export const useGetList = (page: number) => {
  return useQuery({
    queryKey: ["get-list", page],
    retry: 1,
    queryFn: () => getList(page),
  });
};
