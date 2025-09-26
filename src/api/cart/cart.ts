import { httpClient } from "@/api";

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
