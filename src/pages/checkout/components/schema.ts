import z from "zod";

export const CheckoutDetailsSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(2, { message: "Name is too short" }),
  surname: z
    .string()
    .nonempty({ message: "Surname is required" })
    .min(2, { message: "Surname is too short" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Please enter valid email address" }),

  zip_code: z.string().nonempty({ message: "Zip is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
});
