import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import cart from "../../assets/shopping-cart.svg";
import empty_cart from "../../assets/Making Credit Purchase Online Securely.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetCartData } from "@/react-query/query/cart/cartQuery";
import { Minus, Plus } from "lucide-react";
import {
  useChangeCartItemQuantity,
  useDeleteCartItem,
} from "@/react-query/mutation/cart/cartMutation";

const CartSheet = () => {
  const navigate = useNavigate();
  const auth_token = localStorage.getItem("auth_token");
  const [openSheet, setOpenSheet] = useState(false);
  const { data: cartDataArr } = useGetCartData();
  const deliveryPrice = 5;
  const subtotal =
    cartDataArr
      ?.map((product) => product?.total_price)
      .reduce((a, b) => a + b, 0) ?? 0;
  console.log("mycart", cartDataArr);
  const { mutate: mutateDeleteCartItem } = useDeleteCartItem();
  const { mutate: mutateChangeQuantity } = useChangeCartItemQuantity();

  const handleDeleteCartItem = (
    product: number,
    color: string,
    size: string
  ) => {
    mutateDeleteCartItem({ product, color, size });
  };

  const totalPrice = subtotal + deliveryPrice;
  const emptyCartElements = (
    <div className="flex flex-col justify-center">
      <img
        src={empty_cart}
        className="mx-auto mt-[151px] h-[135px] w-[170px]"
        alt="empty-cart"
      />
      <p className="mt-6 text-center text-2xl font-semibold">Ooops!</p>
      <p className="mt-2.5 text-center text-sm font-normal text-[#3E424A]">
        You’ve got nothing in your cart just yet...
      </p>
      <Button
        className="mx-auto mt-[58px] h-[41px] w-[214px] bg-[#FF4000] text-sm font-normal text-[#FFFFFF]"
        onClick={() => {
          navigate("/");
          setOpenSheet(false);
        }}
      >
        Start Shopping
      </Button>
    </div>
  );
  const handleChangeQuantity = (
    product: string,
    changedQuantity: string | number,
    color: string,
    size: string
  ) => {
    mutateChangeQuantity({
      product,
      quantity: changedQuantity,
      color,
      size,
    });
  };
  return (
    <div>
      {" "}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          {auth_token && (
            <img
              src={cart}
              alt="cart-logo"
              className="h-6 w-6 cursor-pointer"
            />
          )}
        </SheetTrigger>
        <SheetContent
          side="right"
          className="h-full w-[540px] px-10 sm:max-w-[540px]"
        >
          <SheetHeader className="px-0 py-[41px]">
            <SheetTitle className="">
              Shopping Cart ( {cartDataArr?.[0] ? cartDataArr.length : 0} )
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {!cartDataArr?.[0] && emptyCartElements}
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
                              product?.size
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
                              product?.size
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
                            product?.size
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

              <div className="mt-8 mb-10">
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
                <Button className="mx-auto h-[58px] w-[460px] bg-[#FF4000] text-[#FFFFFF] hover:bg-orange-600">
                  Go to checkout
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
