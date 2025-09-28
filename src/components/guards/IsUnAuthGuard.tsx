import { useGetCartData } from "@/react-query/query/cart/cartQuery";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsUnAuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const token = localStorage.getItem("auth_token");
  const { data: listData } = useGetCartData();

  if (!token || (listData?.length ?? 0) < 1) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default IsUnAuthGuard;
