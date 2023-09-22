import React from "react";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters!!!")
    .required("Password is required!!!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords do not match")
    .required("Confirm password"),
});

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { accountService } = useService();
  const [token, setToken] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { mutateAsync: mutateResetPassword } = useMutation(
    (reqBody: any) => accountService.resetPasswordChange(reqBody),
    {
      onError: () => console.log("error"),
    }
  );

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const requestBody = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        token: token,
        email: email
      };
      mutateResetPassword(requestBody)
        .then(() => navigate(ROUTES.HOME))
        .then(handleShowAlert);
    },
  });

  const handleShowAlert = () => {
    Swal.fire({
      position: "top-start",
      icon: "success",
      title: "Password Changed Successfully",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const tokenParam = params.token || "";
    const emailParam = params.email || "";

    setToken(tokenParam);
    setEmail(emailParam);
  }, []);
  return (
    <div className="update-password-container">
      <form onSubmit={formik.handleSubmit}>
        <Typography className="title" variant="h4" textAlign="center">
          <SyncLockIcon fontSize="large" />
          Password Change
        </Typography>

        <TextField
          className="full-width"
          label="New Password"
          type="password"
          variant="outlined"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          className="full-width"
          label="Confirm Password"
          type="password"
          variant="outlined"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button className="save-changes-btn" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};
