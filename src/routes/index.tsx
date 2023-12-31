import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../app/Home";
import { ProductProvider } from "../context/ProductContext";
import { ProductDetail } from "../app/ProductDetail";
import { ROUTES } from "./consts";
import ErrorPage from "../app/ErrorPage";
import { Loading } from "../app/components/Loading";
import { Login } from "../app/Login";
import { Register } from "../app/Register";
import { AuthProvider } from "../context/AuthContext";
import { UserDetail } from "../app/UserDetail";
import { ProtectedRouterLoginRegister } from "../ProtectedRouters/ProtectedLoginRegister";
import { ProtectedRouterProfil } from "../ProtectedRouters/ProtectedProfilPage";
import { ShoppingCart } from "../app/ShoppingCart";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { Contact } from "../app/Contact";
import { About } from "../app/About";
import { OrderPage } from "../app/Order";
import { UpdatePassword } from "../app/UpdatePassword";
import { ForgotPassword } from "../app/ForgotPassword";
import { ResetPassword } from "../app/ResetPassword";
import { ConfirmEmail } from "../app/ConfirmEmail";

const ShopPage = React.lazy(() =>
  import("../app/Shop").then(({ ShopPage }) => ({
    default: ShopPage,
  }))
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={ROUTES.USER.LOGIN}
          element={
            <ProtectedRouterLoginRegister>
              <AuthProvider>
                <Login />
              </AuthProvider>
            </ProtectedRouterLoginRegister>
          }
        />
        <Route
          path={ROUTES.USER.REGISTER}
          element={
            <ProtectedRouterLoginRegister>
              <Register />
            </ProtectedRouterLoginRegister>
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
              <ShoppingCartProvider>
                <ShopPage />
              </ShoppingCartProvider>
            </ProductProvider>
          }
        />
        <Route
          path={ROUTES.USER.DETAIL}
          element={
            <ProtectedRouterProfil>
              <UserDetail />
            </ProtectedRouterProfil>
          }
        />

        <Route
          path={ROUTES.SHOPPING_CART}
          element={
            <ProductProvider>
              <ShoppingCartProvider>
                <ShoppingCart />
              </ShoppingCartProvider>
            </ProductProvider>
          }
        />

        <Route
          path={`${ROUTES.PRODUCT.DETAIL}/:id`}
          element={
            <ShoppingCartProvider>
              <ProductDetail />
            </ShoppingCartProvider>
          }
        />
        <Route path={ROUTES.CONTACT_US} element={<Contact />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.ORDER} element={<OrderPage />} />
        <Route
          path={ROUTES.USER.UPDATE_PASSWORD}
          element={
            <AuthProvider>
              <ProtectedRouterProfil>
                <UpdatePassword />
              </ProtectedRouterProfil>
            </AuthProvider>
          }
        />
        <Route
          path={ROUTES.USER.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.USER.RESET_PASSWORD} element={<ResetPassword />} />

        <Route path={ROUTES.CONFIRM_EMAIL} element={<ConfirmEmail />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};
