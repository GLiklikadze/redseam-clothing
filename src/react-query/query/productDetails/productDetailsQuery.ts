import getProductDetails from "@/api/productDetails/productDetails";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetails = (id: number | string) => {
  return useQuery({
    queryKey: ["get-product-details", id],
    retry: 1,
    queryFn: () => getProductDetails(id),
  });
};
