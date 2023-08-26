import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../app/Home";
import { ProductProvider } from "../context/ProductContext";
import { ProductDetail } from "../app/Detail";
import { ROUTES } from "./consts";
import ErrorPage from "../app/ErrorPage";
import { Loading } from "../app/components/Loading";
import { Login } from "../app/Login";
import { Register } from "../app/Register";
import { AuthProvider } from "../context/AuthContext";
import { UserDetail } from "../app/UserDetail";

const ProductList = React.lazy(() =>
  import("../app/Products").then(({ ProductList }) => ({
    default: ProductList,
  }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={ROUTES.USER.LOGIN}
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path={"/"}
          element={
            <ProductProvider>
              <Home />
            </ProductProvider>
          }
        />
        <Route
          path={ROUTES.PRODUCT.LIST}
          element={
            <ProductProvider>
              <ProductList />
            </ProductProvider>
          }
        />
        <Route path={ROUTES.USER.REGISTER} element={<Register />} />  
        
        <Route path={ROUTES.USER.DETAIL} element={<UserDetail />} />

        <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};
