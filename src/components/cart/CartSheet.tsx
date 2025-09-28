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
import CartContent from "@/components/cart/components/CartContent";

const CartSheet = () => {
  const navigate = useNavigate();
  const auth_token = localStorage.getItem("auth_token");
  const [openSheet, setOpenSheet] = useState(false);
  const { data: cartDataArr } = useGetCartData();

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
          <CartContent>
            <Button
              onClick={() => {
                navigate("/checkout");
                setOpenSheet(false);
              }}
              className="mx-auto mb-10 h-[58px] w-[460px] bg-[#FF4000] text-[#FFFFFF] hover:bg-orange-600"
            >
              Go to checkout
            </Button>
          </CartContent>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
