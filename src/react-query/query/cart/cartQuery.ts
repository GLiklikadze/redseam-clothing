import { getCartData } from "@/api/cart/cart";
import { ProductArray } from "@/pages/product-details/components/types";
import { useQuery } from "@tanstack/react-query";


const token = localStorage.getItem("auth_token");

export const useGetCartData = () => {
  return useQuery<ProductArray>({
    queryKey: ["getCartData"],
    queryFn: getCartData,
     enabled: !!token
  });
};
