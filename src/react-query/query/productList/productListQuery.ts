import { getList } from "../../../api/productList/productList";
import { useQuery } from "@tanstack/react-query";

export const useGetList = () => {
  return useQuery({
    queryKey: ["get-list"],
    retry: 1,
    queryFn: () => getList(),
  });
};
