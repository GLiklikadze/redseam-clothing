import { CheckoutDetails } from "@/api/checkout/checkout";
import CartContent from "@/components/cart/components/CartContent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckoutDetailsSchema } from "@/pages/checkout/components/schema";
import { useCheckout } from "@/react-query/mutation/checkout/checkoutMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import done_icon from "../../assets/Frame 69.svg";

const savedUser = localStorage.getItem("user");
type CheckoutInfoFormValues = {
  name: string;
  surname: string;
  email: string;
  address: string;
  zip_code: string;
};
const initialCheckoutInfoObj = {
  name: "",
  surname: "",
  email:
    savedUser && localStorage.getItem("user")
      ? JSON.parse(savedUser || "").email
      : "",
  address: "",
  zip_code: "",
};

const CheckoutPage = () => {
  const { mutate: mutateCheckout, isSuccess } = useCheckout();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInfoFormValues>({
    defaultValues: initialCheckoutInfoObj,
    resolver: zodResolver(CheckoutDetailsSchema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleCheckout = (fieldValues: CheckoutDetails) => {
    mutateCheckout({
      name: fieldValues.name,
      surname: fieldValues.surname,
      email: fieldValues.email,
      address: fieldValues.address,
      zip_code: fieldValues?.zip_code,
    });

    setOpenModal(true);
  };
  return (
    <div className="flex flex-col mt-[72px] px-[100px]">
      <h1 className="mb-8 text-[42px] font-semibold">Checkout</h1>
      <div className="flex flex-row gap-[130px]">
        <div className="w-[1130px] h-[635px] px-[47px] pt-[72px] bg-[#F8F6F7] text-[#3E424A] rounded-2xl">
          <h2 className="text-[22px] font-medium ">Order details</h2>
          <div className="flex flex-col gap-[33px]">
            <div>
              <div className="flex flex-row gap-6 mt-[46px]">
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <Input
                        id="name"
                        type="text"
                        value={value}
                        className={`${errors.name && "border-red-500"} w-[277px] h-[42px] bg-[#FFFFFF]`}
                        onChange={onChange}
                        placeholder="Name"
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
                <Controller
                  name="surname"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => {
                    return (
                      <Input
                        id="surname"
                        type="text"
                        value={value}
                        className={`${errors.surname && "border-red-500"} w-[277px] h-[42px] bg-[#FFFFFF]`}
                        onChange={onChange}
                        placeholder="Surname"
                        onBlur={onBlur}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <MailIcon className="h-5 w-5 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#3E424A]" />
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Input
                      id="email"
                      type="email"
                      value={value}
                      className={`${errors.email && "border-red-500"} w-[578px] h-[42px] pl-9 bg-[#FFFFFF]`}
                      onChange={onChange}
                      placeholder="      Email *"
                      onBlur={onBlur}
                    />
                  );
                }}
              />
            </div>
            <div className="flex flex-row gap-6">
              <Controller
                name="address"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Input
                      id="address"
                      type="text"
                      value={value}
                      className={`${errors.address && "border-red-500"} w-[277px] h-[42px] bg-[#FFFFFF]`}
                      onChange={onChange}
                      placeholder="Address"
                      onBlur={onBlur}
                    />
                  );
                }}
              />
              <Controller
                name="zip_code"
                control={control}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Input
                      id="zip_code"
                      type="text"
                      value={value}
                      className={`${errors.zip_code && "border-red-500"} w-[277px] h-[42px] bg-[#FFFFFF]`}
                      onChange={onChange}
                      placeholder="Zipcode"
                      onBlur={onBlur}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="h-[635px]">
          <CartContent>
            <Button
              onClick={handleSubmit(handleCheckout)}
              className="mx-auto h-[58px] w-[460px] bg-[#FF4000] text-[#FFFFFF] hover:bg-orange-600"
            >
              Pay
            </Button>
          </CartContent>
        </div>
        <Dialog
          open={openModal}
          onOpenChange={(open) => {
            setOpenModal(open);
            if (!open) {
              navigate("/products");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <img
                src={done_icon}
                alt="done-icon"
                className="mx-auto mt-[114px]"
              />
              <DialogTitle className="mx-auto text-[42px] font-semibold">
                Congrats
              </DialogTitle>
              <DialogDescription className="mx-auto text-sm font-normal">
                Your order is placed successfully!
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mx-auto mt-[58px] h-[41px] w-[214px] bg-[#FF4000] text-sm font-normal text-[#FFFFFF]"
              onClick={() => {
                navigate("/products");
                setOpenModal(false);
              }}
            >
              Start Shopping
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CheckoutPage;
