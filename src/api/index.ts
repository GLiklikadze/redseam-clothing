import axios, { AxiosInstance } from "axios";

const baseUrl = "https://api.redseam.redberryinternship.ge/api";

const axiosConfig = {
  baseURL: baseUrl,
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
