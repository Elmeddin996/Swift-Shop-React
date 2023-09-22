import React from "react";
import "./style.scss";
import { useMutation, useQuery } from "react-query";
import { EQueryKeys } from "../../enums";
import { useService } from "../../APIs/Services";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IUserData } from "../../models";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const validationSchema = yup.object({
  userName: yup.string().required("User name is required!!!"),
  email: yup
    .string()
    .email("Enter a valid email!!!")
    .required("Email is required!!!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters!!!")
    .required("Password is required!!!"),
  fullName: yup.string().required("Enter your first and last name!!!"),
});


export const UserDetail: React.FC = () => {
  const { authService } = useService();
  const [showPassword, setShowPassword] = React.useState(false);
  const [result, setResult] = React.useState<string>("");

  const { data: userData} = useQuery([EQueryKeys.GET_USER_DATA], () =>
    authService.getUserData()
  );

  const { mutateAsync: mutateUserData } = useMutation(
    (RequestBody: IUserData) =>authService.userDataUpdate(RequestBody),
    {
      onError: () => setResult(`error`),
    }
  );

  const formik = useFormik<IUserData>({
    initialValues: {
      userName: userData?.data?.userName,
      email: userData?.data?.email,
      fullName: userData?.data?.fullName,
      address: userData?.data?.address,
      phone: userData?.data?.phone,
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutateUserData(values)
    },
  });

  return (
    <div className="profile-container">
      <Typography variant="h4">
        <AccountCircleIcon fontSize="large" /> Account Details
      </Typography>
      <form className="user-data" onSubmit={formik.handleSubmit}>
        <TextField
          className="half-width"
          label="Full Name"
          variant="outlined"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          className="half-width"
          label="Username"
          variant="outlined"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <Box className="flex-wrap">
          <TextField
            className="half-width"
            label="Email"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            className="half-width"
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
          />
        </Box>
        <TextField
          className="full-width"
          label="Adress"
          variant="outlined"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
        />

        <FormControl className="full-width" variant="outlined">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            className="full-width"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <FormHelperText sx={{ color: "red" }}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FormHelperText>
        </FormControl>
        {result && (
          <Alert severity="error">Email or Password is incorrect</Alert>
        )}
       
        <Button className="save-changes-btn" type="submit">
          Save Changes
        </Button>

       
      </form>
      <Link className="link" to={ROUTES.USER.UPDATE_PASSWORD}>Password Change</Link>
    </div>
  );
};
