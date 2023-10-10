import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import "./style.scss";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import { ROUTES } from "../../routes/consts";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email!!!")
    .required("Email is required!!!"),
});

export const ForgotPassword: React.FC = () => {
  const { accountService } = useService();
  const navigate = useNavigate();

  const { mutateAsync: mutateForgotPassword } = useMutation(
    (reqBody: any) => accountService.forgotPassword(reqBody)
  );
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      mutateForgotPassword(value)
        .then(() => navigate(ROUTES.HOME))
        .then(handleShowAlert)
        .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
    },
  });
  const handleShowAlert = () => {
    Swal.fire({
      position: "top-start",
      icon: "success",
      title: "Check Your Email",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  return (
    <div className="forgot-password-container">
      <form onSubmit={formik.handleSubmit}>
        <Typography className="title" variant="h4" textAlign="center">
          <SyncLockIcon fontSize="large" />
          Forgot Password
        </Typography>

        <TextField
          className="full-width"
          label="Email"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Button className="save-changes-btn" type="submit">
          Send Email
        </Button>
      </form>
    </div>
  );
};
