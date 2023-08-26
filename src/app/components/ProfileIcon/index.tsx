import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";

export const ProfileIcon = () => {
  const navigate = useNavigate();

  const handleProfileDetail = ()=>{
  navigate(ROUTES.USER.DETAIL)
  }
  return (
    <Button onClick={handleProfileDetail} color="inherit" sx={{ marginLeft: "10px" }}>
      <AccountBoxIcon fontSize="large" />
      Profile
    </Button>
  );
};
