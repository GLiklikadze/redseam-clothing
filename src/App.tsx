import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./pages/product-list/ProductList";
import { Suspense } from "react";
import RootLayout from "./components/layout/RootLayout";
import ProductDetails from "@/pages/product-details/ProductDetails";
import RegisterPage from "@/pages/register-page/RegisterPage";
import LoginPage from "@/pages/login-page/LoginPage";

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
      </Routes>
    </>
  );
}

export default App;
