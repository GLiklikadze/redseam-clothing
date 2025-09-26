import { addToCart } from "@/api/productDetails/productDetails";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: addToCart,
  });
};
