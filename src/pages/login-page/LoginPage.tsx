import register_image from "../../assets/register-image.webp";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/react-query/mutation/auth/authMutation";
import { useNavigate } from "react-router-dom";
import { LoginFormSchema } from "@/pages/login-page/components/schema";
import { LoginFormValues } from "@/pages/login-page/components/types";

const initialLoginObj = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialLoginObj,
    resolver: zodResolver(LoginFormSchema),
    mode: "onBlur",
  });
  const { mutate } = useLogin();

  const onSubmit = (fieldValues: LoginFormValues) => {
    console.log(fieldValues);
    mutate(fieldValues);
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
        <h1 className="mt-[152px] text-[42px] font-semibold">Log in</h1>
        <div className="flex flex-col gap-6">
          <div className="w-[554px]">
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
              <div className="mt-2 mr-10 text-xs text-red-700">
                {errors?.email.message}
              </div>
            )}
          </div>
          <div>
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
              <div className="mr-4 text-xs text-red-700">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="h-[41px] w-full bg-[#FF4000] text-sm font-normal text-[#FFFFFF]"
            onClick={handleSubmit(onSubmit)}
          >
            Log in
          </Button>
          <p className="mx-auto text-sm font-normal">
            Not a member?{" "}
            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer text-sm font-medium text-[#FF4000]"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
