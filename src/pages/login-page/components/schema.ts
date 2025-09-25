import z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Please enter email address" })
    .email({ message: "Please enter valid email address" }),
  password: z
    .string()
    .nonempty({ message: "Please enter password" })
    .min(6, { message: "Please enter min 6 symbol" })
    .max(25, { message: "password-maxLength-error" }),
});
