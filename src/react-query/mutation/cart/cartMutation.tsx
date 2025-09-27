import { deleteCartItem } from "@/api/cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeteteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCartData"],
      });
    },
  });
};
