import { cartCheckout } from "@/api/checkout/checkout";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["checkout"],
    mutationFn: cartCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries(["getCartData"] as InvalidateQueryFilters);
    },
  });
};
