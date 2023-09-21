import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useService } from "../../APIs/Services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import './style.scss'
import HowToRegIcon from '@mui/icons-material/HowToReg';

const validationSchema = yup.object({
  username: yup.string().required("User name is required!!!"),
  email: yup
    .string()
    .email("Enter a valid email!!!")
    .required("Email is required!!!"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters!!!")
    .required("Password is required!!!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords do not match")
    .required("Confirm password"),
  fullName: yup.string().required("Enter your first and last name!!!"),
});

export const Register: React.FC = () => {
  const { authService } = useService();
  const navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      currentPassword: "",
      confirmPassword: "",
      fullName: "",
      address: "",
      phone: "+994",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authService.register(values)
      navigate(ROUTES.USER.LOGIN)
    },
  });

  return (
    <Container className="register-container" maxWidth="sm" >
      <Typography className="title">
      <HowToRegIcon fontSize="large"/>
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          fullWidth
          label="User Name"
          variant="outlined"
          margin="normal"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
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
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          margin="normal"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          margin="normal"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};
