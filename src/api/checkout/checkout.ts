import { httpClient } from "@/api";
export type CheckoutDetails = {
  name: string;
  surname: string;
  email: string;
  address: string;
  zip_code: string;
};

export const cartCheckout = async ({
  name,
  surname,
  email,
  address,
  zip_code,
}: CheckoutDetails) => {
  try {
    const { data, status, statusText } = await httpClient.post(
      `cart/checkout`,
      {
        name,
        surname,
        email,
        address,
        zip_code,
      },
    );

    if (status !== 200 && status !== 201 && status !== 204) {
      throw new Error(`HTTP error! status ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t checkout", err);
    throw err;
  }
};
