import { changeCartItemQuantity, deleteCartItem } from "@/api/cart/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCartItem = () => {
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
export const useChangeCartItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["changeCartItemQuantity"],
    mutationFn: changeCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCartData"],
      });
    },
  });
};
