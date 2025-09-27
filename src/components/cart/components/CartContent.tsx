import { useGetCartData } from "@/react-query/query/cart/cartQuery";
import { Minus, Plus } from "lucide-react";
import {
  useChangeCartItemQuantity,
  useDeleteCartItem,
} from "@/react-query/mutation/cart/cartMutation";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

const CartContent: React.FC<PropsWithChildren> = ({ children }) => {
  const { mutate: mutateDeleteCartItem } = useDeleteCartItem();
  const { mutate: mutateChangeQuantity } = useChangeCartItemQuantity();
  const { data: cartDataArr } = useGetCartData();

  const deliveryPrice = 5;
  const subtotal =
    cartDataArr
      ?.map((product) => product?.total_price)
      .reduce((a, b) => a + b, 0) ?? 0;
  const totalPrice = subtotal + deliveryPrice;
  const handleChangeQuantity = (
    product: string,
    changedQuantity: string | number,
    color: string,
    size: string,
  ) => {
    mutateChangeQuantity({
      product,
      quantity: changedQuantity,
      color,
      size,
    });
  };
  const handleDeleteCartItem = (
    product: number,
    color: string,
    size: string,
  ) => {
    mutateDeleteCartItem({ product, color, size });
  };

  console.log("mycart", cartDataArr);
  return (
    <>
      {" "}
      {cartDataArr?.[0] && (
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-[460px] flex-col gap-9 overflow-y-auto">
            {cartDataArr?.map((product) => (
              <div
                key={`${product?.id}${product?.color}${product?.size}`}
                className="flex flex-row"
              >
                <img
                  src={product?.cover_image}
                  className="h-[134px] w-[100px] rounded-sm border-[1px] border-[#E1DFE1]"
                  alt="product-img"
                />
                <div className="ml-[17px] flex w-[285px] flex-col justify-between py-[8.5px]">
                  <div className="flex flex-col gap-2.5">
                    <p className="text-sm font-medium first-letter:uppercase">
                      {product?.name}
                    </p>
                    <p className="text-xs font-normal text-[#3E424A]">
                      {product?.color}
                    </p>
                    <p className="text-xs font-normal text-[#3E424A]">
                      {product?.size}
                    </p>
                  </div>
                  <div className="flex h-[26px] w-[70px] flex-row items-center justify-between rounded-[22px] border-[1px] border-[#E1DFE1] px-2">
                    <button
                      disabled={product?.quantity < 2}
                      onClick={() =>
                        handleChangeQuantity(
                          String(product?.id),
                          product?.quantity - 1,
                          product?.color,
                          product?.size,
                        )
                      }
                    >
                      <Minus
                        className={`h-4 w-4 ${
                          product?.quantity < 2
                            ? "text-[#E1DFE1]"
                            : "text-[#3E424A]"
                        } cursor-pointer`}
                      />
                    </button>
                    <div className="text-xs font-normal">
                      {product?.quantity}
                    </div>
                    <button
                      disabled={product?.quantity > 9}
                      onClick={() =>
                        handleChangeQuantity(
                          String(product?.id),
                          product?.quantity + 1,
                          product?.color,
                          product?.size,
                        )
                      }
                    >
                      <Plus
                        className={`h-4 w-4 ${
                          product?.quantity < 10
                            ? "text-[#3E424A]"
                            : "text-[#E1DFE1]"
                        } cursor-pointer`}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between py-[8.5px]">
                  <div className="text-right text-[18px] font-medium whitespace-nowrap">
                    $ {product?.price}
                  </div>
                  <button
                    onClick={() =>
                      handleDeleteCartItem(
                        product?.id,
                        product?.color,
                        product?.size,
                      )
                    }
                    className="cursor-pointer pb-1 text-xs font-normal text-[#3E424A]"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="mb-[102px] flex flex-col gap-4">
              <div className="flex flex-row justify-between text-base font-normal">
                <div>Items subtotal</div>
                <div>$ {subtotal}</div>
              </div>
              <div className="flex flex-row justify-between text-base font-normal">
                <div>Delivery</div>$ {deliveryPrice}
              </div>
              <div className="flex flex-row justify-between text-base font-normal">
                <div>Total</div>$ {totalPrice}
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CartContent;
