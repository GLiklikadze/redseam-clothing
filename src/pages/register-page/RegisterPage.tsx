import register_image from "../../assets/register-image.png";
import upload_avatar from "../../assets/register-user-img.png";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/react-query/mutation/auth/authMutation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterFormSchema } from "@/pages/register-page/components/schema";
import { RegisterFormValues } from "@/pages/register-page/components/types";

const initialRegisterObj = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: null,
};

const RegisterPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    defaultValues: initialRegisterObj,
    resolver: zodResolver(RegisterFormSchema),
    mode: "onBlur",
  });

  const { mutate } = useRegister();
  // const { mutate, isPending, isError, error, isSuccess } = useRegister();

  const onSubmit = (fieldValues: RegisterFormValues) => {
    const formData = {
      userName: fieldValues.userName,
      email: fieldValues.email,
      password: fieldValues.password,
      confirmPassword: fieldValues.confirmPassword,
      avatar: fieldValues.avatar ? fieldValues.avatar : null,
    };
    mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("avatar", file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-row gap-[173px]">
      <div>
        <img
          src={register_image}
          alt="register_img"
          className="ml-0 h-[1000px] w-[948px]"
        />
      </div>
      <div className="space-y-[46px]">
        <h1 className="mt-[152px] text-[42px] font-semibold">Registration</h1>

        <div className="flex h-[100px] w-[272px] flex-row items-center gap-[15px]">
          <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
            <img
              src={previewUrl || upload_avatar}
              alt="user_avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <label className="cursor-pointer text-sm font-normal">
            Upload new
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p
            className="cursor-pointer text-sm font-normal"
            onClick={() => {
              setValue("avatar", null);
              setPreviewUrl(null);
            }}
          >
            Remove
          </p>
        </div>
        <div className="flex w-[554px] flex-col gap-6">
          <div>
            <Controller
              name="userName"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <Input
                    id="userName"
                    type="text"
                    value={value}
                    className={errors.userName && "border-red-500"}
                    onChange={onChange}
                    placeholder="Username *"
                    onBlur={onBlur}
                  />
                );
              }}
            />
            {errors.userName && (
              <div className="mt-2 mr-10 text-[10px] text-red-700">
                {errors.userName?.message}
              </div>
            )}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <Input
                    id="email"
                    type="email"
                    value={value}
                    className={errors.email && "border-red-500"}
                    onChange={onChange}
                    placeholder="Email *"
                    onBlur={onBlur}
                  />
                );
              }}
            />
            {errors.email && (
              <div className="mt-2 mr-10 text-[10px] text-red-700">
                {errors.email?.message}
              </div>
            )}
          </div>
          <div className="">
            <div className="flex items-center"></div>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <Input
                    id="password"
                    type="password"
                    className={errors.password && "border-red-500"}
                    onChange={onChange}
                    value={value}
                    placeholder="Password *"
                    onBlur={onBlur}
                  />
                );
              }}
            />
            {errors.password && (
              <div className="mr-4 text-[10px] text-red-700">
                {errors.password?.message}
              </div>
            )}
          </div>
          <div className="">
            <div className="flex items-center"></div>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <Input
                    id="confirmPassword"
                    type="password"
                    className={errors.password && "border-red-500"}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    placeholder="Confirm password *"
                  />
                );
              }}
            />
            {errors.confirmPassword && (
              <div className="mt-2 mr-10 text-[10px] text-red-700">
                {errors?.confirmPassword?.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="h-[41px] w-full bg-[#FF4000] text-sm font-normal text-[#FFFFFF]"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
          <p className="mx-auto text-sm font-normal">
            Already member ?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer text-sm font-medium text-[#FF4000]"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
