import { httpClient } from "@/api";

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
