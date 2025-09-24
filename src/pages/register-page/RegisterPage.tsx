import register_image from "../../assets/register-image.png";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/react-query/mutation/auth/authMutation";

const initialRegisterObj = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
};
type RegisterFormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const LoginFormSchema = z.object({
  userName: z.string().nonempty({ message: "username-required-error" }),
  email: z
    .string()
    .nonempty({ message: "email-required-error" })
    .email({ message: "email-invalid-pattern" }),

  password: z
    .string()
    .nonempty({ message: "password-required-error" })
    .min(6, { message: "password-minLength-error" })
    .max(25, { message: "password-maxLength-error" }),
  confirmPassword: z
    .string()
    .nonempty({ message: "confirm-password-required-error" }),
});
const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: initialRegisterObj,
    resolver: zodResolver(LoginFormSchema),
    mode: "onBlur",
  });
  const { mutate } = useRegister();
  // const { mutate, isPending, isError, error, isSuccess } = useRegister();

  const onSubmit = (fieldValues: RegisterFormValues) => {
    console.log(fieldValues);
    mutate(fieldValues);
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
          <div className="w-[100px] h-[100px] rounded-full bg-amber-300">
            {/* <img src={} alt="user_avatar" /> */}
          </div>
          <p>Upload new</p>
          <p>Remove</p>
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
                    className={errors.email && "border-red-500"}
                    onChange={onChange}
                    placeholder="Username *"
                    onBlur={onBlur}
                  />
                );
              }}
            />
            {errors.email && <div className="mr-10 mt-2 text-red-700">111</div>}
          </div>
          <div className="">
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
            {errors.email && <div className="mr-10 mt-2 text-red-700">111</div>}
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
            {errors.password && <div className="mr-4  text-red-700">error</div>}
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
            {errors.password && (
              <div className="mr-10 mt-2 text-red-700">error</div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FF4000] text-[#FFFFFF] h-[41px] text-sm font-normal"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </Button>
          <p className="mx-auto">Already member ? Log in</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
