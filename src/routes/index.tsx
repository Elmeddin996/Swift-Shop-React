import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../app/Home";
import { ProductProvider } from "../context/ProductContext";
import { ProductDetail } from "../app/Detail";
import { ROUTES } from "./consts";
import { ProductList } from "../app/Products";
import ErrorPage from "../app/ErrorPage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
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
      <Route path={ROUTES.PRODUCT.DETAIL} element={<ProductDetail />} />

      <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  );
};
