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
          className="w-[948px] h-[1000px] ml-0"
        />
      </div>
      <div className="space-y-[46px]">
        <h1 className="text-[42px] font-semibold mt-[152px]">Registration</h1>

        <div className="w-[272px] h-[100px] flex flex-row gap-[15px] items-center">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              src={previewUrl || upload_avatar}
              alt="user_avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="text-sm font-normal cursor-pointer">
            Upload new
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p
            className="text-sm font-normal cursor-pointer"
            onClick={() => {
              setValue("avatar", null);
              setPreviewUrl(null);
            }}
          >
            Remove
          </p>
        </div>
        <div className="w-[554px] flex flex-col gap-6">
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
              <div className="mr-10 mt-2 text-[10px] text-red-700">
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
              <div className="mr-10 mt-2 text-[10px] text-red-700">
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
              <div className="mr-10 mt-2 text-[10px] text-red-700">
                {errors?.confirmPassword?.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FF4000] text-[#FFFFFF] h-[41px] text-sm font-normal"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
          <p className="mx-auto text-sm font-normal">
            Already member ?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-sm text-[#FF4000] font-medium cursor-pointer"
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
