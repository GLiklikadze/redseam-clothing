import z from "zod";

export const RegisterFormSchema = z
  .object({
    userName: z.string().nonempty({ message: "Username is required" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Please enter valid email address" }),

    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Please enter min 6 symbol" })
      .max(25, { message: "password-maxLength-error" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "confirm-password-required-error" }),
    avatar: z.any().nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
