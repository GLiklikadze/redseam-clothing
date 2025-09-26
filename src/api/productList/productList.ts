import { httpClient } from "..";
type SortOption = "price" | "created_at" | "-price" | "";
export const getList = async (
  page: number,
  priceFrom = "0",
  priceTo = "9999999",
  sortBy: SortOption
) => {
  try {
    const { data, status, statusText } = await httpClient.get(
      `products/?page=${page}&filter[price_from]=${priceFrom}&filter[price_to]=${priceTo}&sort=${sortBy}`
    );
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t fetch list", err);
    throw err;
  }
};
