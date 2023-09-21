import React from "react";
import LogoutIconn from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { logout } from "../../../features/userLogined/loginSlice";
import { useDispatch } from "react-redux";
import { useService } from "../../../APIs/Services";
import { useMutation } from "react-query";

export const LogoutIcon = () => {
  const { authService } = useService();
  const dispatch = useDispatch();

  const { mutateAsync: mutateLogout } = useMutation(() =>
  authService.logout(),
  {
    onSuccess:()=>{dispatch(logout())}
  }
  );

  return (
    <Button onClick={()=>mutateLogout()} color="inherit" sx={{ marginLeft: "10px" }}>
      <LogoutIconn fontSize="large" />
      Logout
    </Button>
  );
};
