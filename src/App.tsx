import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./pages/product-list/ProductList";
import { Suspense } from "react";
import RootLayout from "./components/layout/RootLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <Suspense fallback="Loading...">
                <ProductList />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
