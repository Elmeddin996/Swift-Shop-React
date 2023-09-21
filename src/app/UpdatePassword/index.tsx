import React from "react";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./style.scss";
import { useAuthentication } from "../../hooks";

const validationSchema = yup.object({
  currentPassword: yup
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
    const {mutatePassword } = useAuthentication();
 
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutatePassword(values)
        .then(() => console.log("sucess"))
        .catch(() => console.log("error"));
    },
  });
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
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.currentPassword &&
            Boolean(formik.errors.currentPassword)
          }
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
        />

        <TextField
          className="full-width"
          label="New Password"
          type="password"
          variant="outlined"
          name="newPassword"
          value={formik.values.newPassword}
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
          value={formik.values.confirmPassword}
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
