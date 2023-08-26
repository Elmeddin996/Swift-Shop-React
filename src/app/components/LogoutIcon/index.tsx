import React from "react";
import LogoutIconn from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { logout } from "../../../features/userLogined/loginSlice";
import { useDispatch } from "react-redux";

export const LogoutIcon = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout());
  };

  return (
    <Button onClick={handleLogout} color="inherit" sx={{ marginLeft: "10px" }}>
      <LogoutIconn fontSize="large" />
      Logout
    </Button>
  );
};
