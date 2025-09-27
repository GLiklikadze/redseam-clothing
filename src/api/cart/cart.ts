import { httpClient } from "@/api";

type DeleteCartItemProps = {
  product: string | number;
  color: string;
  size: string;
};
export const getCartData = async () => {
  try {
    const { data, status, statusText } = await httpClient.get(`cart`);
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t get cart data", err);
    throw err;
  }
};

export const deleteCartItem = async ({
  product,

  color,
  size,
}: DeleteCartItemProps) => {
  try {
    const { data, status, statusText } = await httpClient.delete(
      `cart/products/${product}`,
      {
        data: {
          color: color,
          size: size,
        },
      }
    );
    console.log({
      color: color,
      size: size,
    });
    if (status !== 200 && status !== 201 && status !== 204) {
      throw new Error(`HTTP error! status ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t detele cart item", err);
    throw err;
  }
};
