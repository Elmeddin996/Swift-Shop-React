import React from "react";
import { ROUTES } from "../routes/consts";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  children: any;
}

export const ProtectedRouterProfil: React.FC<IProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to={ROUTES.USER.LOGIN} />;
};
