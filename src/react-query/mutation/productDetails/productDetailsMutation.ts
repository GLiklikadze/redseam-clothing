import { addToCart } from "@/api/productDetails/productDetails";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCartData"] as InvalidateQueryFilters);
    },
  });
};
