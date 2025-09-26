import { getCartData } from "@/api/cart/cart";
import { ProductArray } from "@/pages/product-details/components/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCartData = () => {
  return useQuery<ProductArray>({
    queryKey: ["getCartData"],
    queryFn: getCartData,
  });
};
