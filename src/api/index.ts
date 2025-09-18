import axios, { AxiosInstance } from "axios";

const baseUrl = "https://api.redseam.redberryinternship.ge/api";
// 9e6a37c9-3e04-4b7a-a178-32290baad8f1
const axiosConfig = {
  baseURL: baseUrl,
  //   headers: {
  //     Authorization: "Bearer 9e6a71fd-1c1a-48b6-bb51-77e6e26b435f",
  //   },
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);
