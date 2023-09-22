import React from "react";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./style.scss";
import { useAuthentication } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userLogined/loginSlice";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters!!!")
    .required("Password is required!!!"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters!!!")
    .required("Password is required!!!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords do not match")
    .required("Confirm password"),
});

export const UpdatePassword = () => {
  const { mutatePassword } = useAuthentication();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutatePassword(values)
      .then(()=>dispatch(logout()))
      .then(() => navigate(ROUTES.HOME))
      .then(handleShowAlert);
    },
  });

  const handleShowAlert = () => {
    Swal.fire({
      position: 'top-start',
      icon: 'success',
      title: 'Password Changed Successfully',
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div className="update-password-container">
      <form onSubmit={formik.handleSubmit}>
        <Typography className="title" variant="h4" textAlign="center">
          <SyncLockIcon fontSize="large" />
          Password Change
        </Typography>

        <TextField
          className="full-width"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          className="full-width"
          label="New Password"
          type="password"
          variant="outlined"
          name="newPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
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
        <Link className="forgot-password-link" to={ROUTES.USER.FORGOT_PASSWORD}>
          Forgot password?
        </Link>

        <Button className="save-changes-btn" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};
