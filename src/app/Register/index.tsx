import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import './style.scss'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IUserData } from "../../models";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import Swal from "sweetalert2";

const validationSchema = yup.object({
  userName: yup.string().required("User name is required!!!"),
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
    .oneOf([yup.ref('password'), undefined], 'Passwords do not match')
    .required('Confirm password is required'),
  fullName: yup.string().required("Enter your first and last name!!!"),
});

export const Register: React.FC = () => {
  const navigate=useNavigate();
  const { authService } = useService();


  const { mutateAsync: mutateRegister } = useMutation(
    (reqBody: IUserData) => authService.register(reqBody),
    {
      onError: (error: any) => {
        if (error.response?.status === 409) {
          Swal.fire(
            'User already exists!',
            'A user with the same username or email already exists.',
            'error'
          );
        } else {
          Swal.fire("Error!", "Something is wrong.", "error")
        }
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      address: "",
      phone: "+994",
    },
    validationSchema: validationSchema,
    onSubmit: (values:IUserData) => {
      mutateRegister(values).catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
      navigate(ROUTES.USER.LOGIN)
      Swal.fire(
        "Check Your Email!",
        "A confirmation link has been sent to your email address.",
        "success"
      );
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
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
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
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
