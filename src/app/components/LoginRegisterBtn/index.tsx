import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";

interface Props {
  isLogined: boolean;
}

export const LoginRegisterBtn: React.FC<Props> = ({ isLogined }) => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate(ROUTES.USER.LOGIN, { state: { isLogined } });
  };
  return (
    <Grid>
      <Box>
        <Button
          variant="outlined"
          sx={{
            marginLeft: "auto",
            background: "rgba(0,0,0,0.9976365546218487)",
            color: "white",
          }}
          onClick={handleNavigateLogin}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          sx={{
            marginLeft: 1,
            background: "rgba(0,0,0,0.9976365546218487)",
            color: "white",
          }}
          onClick={() => {
            navigate(ROUTES.USER.REGISTER);
          }}
        >
          Register
        </Button>
      </Box>
    </Grid>
  );
};
