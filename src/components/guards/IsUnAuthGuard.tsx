import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsUnAuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default IsUnAuthGuard;
