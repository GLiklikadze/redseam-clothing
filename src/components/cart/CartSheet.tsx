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

const CartSheet = () => {
  const navigate = useNavigate();
  const auth_token = localStorage.getItem("auth_token");
  const [openSheet, setOpenSheet] = useState(false);
  const { data: cartDataArr } = useGetCartData();
  console.log("mycart", cartDataArr);
  const emptyCartElements = (
    <div className="flex flex-col justify-center">
      <img
        src={empty_cart}
        className="w-[170px] h-[135px] mx-auto mt-[151px]"
        alt="empty-cart"
      />
      <p className="text-2xl font-semibold text-center mt-6">Ooops!</p>
      <p className="text-sm mt-2.5 font-normal text-center text-[#3E424A]">
        You’ve got nothing in your cart just yet...
      </p>
      <Button
        className="w-[214px] h-[41px] text-sm font-normal text-[#FFFFFF] mx-auto mt-[58px] bg-[#FF4000]"
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
          className="w-[540px] sm:max-w-[540px] h-full "
        >
          <SheetHeader>
            <SheetTitle>
              Shopping Cart ( {cartDataArr?.[0] ? cartDataArr.length : 0} )
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {!cartDataArr?.[0] && emptyCartElements}
          <div className="flex flex-col gap-9 mx-10">
            {cartDataArr?.map((product) => (
              <div key={product.id} className="flex flex-row">
                <img
                  src={product?.cover_image}
                  className="w-[100px] h-[134px] border-[1px] border-[#E1DFE1] rounded-sm"
                  alt="product-img"
                />
                <div className="w-[285px] flex flex-col gap-2.5 ml-[17px] py-[8.5px]">
                  <p className="text-sm font-medium">{product?.name}</p>
                  <p className="text-xs text-[#3E424A] font-normal">
                    {product?.color}
                  </p>
                  <p className="text-xs text-[#3E424A] font-normal">
                    {product?.size}
                  </p>
                </div>
                <div className="flex flex-col justify-between py-[8.5px]">
                  <div className="text-[18px] font-medium">
                    $ {product?.price}
                  </div>
                  <div className="text-xs text-[#3E424A] font-normal">
                    Remove
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <Button className="w-[460px] h-[58px] text-[#FFFFFF] mx-auto bg-[#FF4000] hover:bg-orange-600">
            Go to checkout
          </Button> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
