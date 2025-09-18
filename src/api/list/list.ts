import { httpClient } from "..";

export const getList = async () => {
  try {
    const { data, status, statusText } = await httpClient.get(`products`);
    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t fetch list", err);
    throw err;
  }
};
