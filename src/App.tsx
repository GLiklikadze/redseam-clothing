import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import RootLayout from "./components/layout/RootLayout";
import IsUnAuthGuard from "@/components/guards/IsUnAuthGuard";
import IsAuthGuard from "@/components/guards/IsAuthGuard";

const ProductList = lazy(() => import("./pages/product-list/ProductList"));
const ProductDetails = lazy(
  () => import("@/pages/product-details/ProductDetails"),
);
const RegisterPage = lazy(() => import("@/pages/register-page/RegisterPage"));
const LoginPage = lazy(() => import("@/pages/login-page/LoginPage"));
const CheckoutPage = lazy(() => import("@/pages/checkout/CheckoutPage"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route
            path="products"
            element={
              <Suspense fallback="Loading...">
                <ProductList />
              </Suspense>
            }
          />
          <Route
            path="products/:products_id"
            element={
              <Suspense fallback="Loading...">
                <ProductDetails />
              </Suspense>
            }
          />
          <Route element={<IsAuthGuard />}>
            <Route
              path="register"
              element={
                <Suspense fallback="Loading...">
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback="Loading...">
                  <LoginPage />
                </Suspense>
              }
            />
          </Route>
          <Route element={<IsUnAuthGuard />}>
            <Route
              path="checkout"
              element={
                <Suspense fallback="Loading...">
                  <CheckoutPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
