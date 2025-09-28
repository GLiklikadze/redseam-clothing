import z from "zod";

export const CheckoutDetailsSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name is too short" }),
  surname: z
    .string()
    .nonempty({ message: "Surname is required" })
    .min(3, { message: "Surname is too short" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter valid email address" }),

  zip_code: z
    .string()
    .regex(/^\d+$/, "Must be a number")
    .min(3, { message: "Zip code is too short" }),
  address: z
    .string()
    .nonempty({ message: "Address is required" })
    .min(3, { message: "Address is too short" }),
});
