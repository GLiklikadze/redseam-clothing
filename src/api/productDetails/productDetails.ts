import { httpClient } from "@/api";

type addToCartProps = {
  product: string | number;
  color: string;
  quantity: string | number;
  size: string;
};
const getProductDetails = async (id: number | string) => {
  try {
    const { data, status, statusText } = await httpClient.get(`products/${id}`);
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t fetch product details", err);
    throw err;
  }
};
export default getProductDetails;

export const addToCart = async ({
  product,
  color,
  quantity,
  size,
}: addToCartProps) => {
  try {
    const { data, status, statusText } = await httpClient.post(
      `cart/products/${product}`,
      {
        color: color,
        quantity: quantity,
        size: size,
      }
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }

    return data;
  } catch (err) {
    console.error("Can`t add to cart", err);
    throw err;
  }
};
