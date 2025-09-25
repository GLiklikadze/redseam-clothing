import { httpClient } from "@/api";

type httpRegisterProps = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
};

type httpLoginProps = {
  email: string;
  password: string;
};

export const register = async ({
  userName,
  email,
  password,
  confirmPassword,
  avatar,
}: httpRegisterProps) => {
  try {
    const { data, status, statusText } = await httpClient.post(
      `register`,
      {
        username: userName,
        email,
        password,
        password_confirmation: confirmPassword,
        avatar: avatar,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    if (data?.token) {
      localStorage.setItem("auth_token", data.token);
    }
    return data;
  } catch (err) {
    console.error("Can`t register", err);
    throw err;
  }
};

export const login = async ({ email, password }: httpLoginProps) => {
  try {
    const { data, status, statusText } = await httpClient.post(`login`, {
      email,
      password,
    });

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    if (data?.token) {
      localStorage.setItem("auth_token", data.token);
    }
    return data;
  } catch (err) {
    console.error("Can`t Login", err);
    throw err;
  }
};
