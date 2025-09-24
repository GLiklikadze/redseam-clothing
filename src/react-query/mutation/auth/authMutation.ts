import { login, register } from "@/api/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => navigate("/"),
  });
};
export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => navigate("/"),
  });
};
