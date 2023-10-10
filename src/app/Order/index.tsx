import React from "react";
import {
  Box,
  Button,
  Divider,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import { ICartProduct } from "../../models";
import { useFormik } from "formik";
import * as yup from "yup";
import { useService } from "../../APIs/Services";
import { useMutation, useQueryClient } from "react-query";
import { ROUTES } from "../../routes/consts";
import { EQueryKeys } from "../../enums";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const validationSchema = yup.object({
  fullName: yup.string().required("Enter your first and last name!"),
  email: yup
    .string()
    .email("Enter a valid email!")
    .required("Email is required!"),
  phone: yup
    .string()
    .min(13, "Enter valid number!")
    .required("Phone number is required!"),
  address: yup.string().required("Address is required!"),
});

export const OrderPage = () => {
  const { state } = useLocation();
  const { orderService, cartItemService } = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );

  const { mutateAsync: mutateRemoveAllItems } = useMutation(
    () => cartItemService.removeCartItems(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EQueryKeys.GET_CART_ITEMS]);
      },
    }
  );

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 6;
  const slicedOrders = state?.orderedProducts.slice(startIndex, startIndex + 6);

  const { mutateAsync: mutateOrder } = useMutation(
    (reqBody: any) => orderService.createOrder(reqBody),
    {
      onSuccess: () => {
        navigate(ROUTES.SHOPPING_CART);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      address: "",
      phone: "+994",
      orderNotes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const orderItems = state?.orderedProducts.map(
        (product: ICartProduct) => ({
          productId: product.id,
          productName: product.name,
          count: product.count,
        })
      );
      const requestBody = {
        email: values.email,
        fullName: values.fullName,
        address: values.address,
        phone: values.phone,
        note: values.orderNotes,
        orderItems: orderItems,
      };
      mutateOrder(requestBody)
        .then(() => {
          Swal.fire({
            position: "top-start",
            icon: "success",
            title: "Ordered Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .then(() => {
          if (isAuthenticated) {
            mutateRemoveAllItems();
          } else {
            localStorage.removeItem("cart");
          }
        })
        .catch(() => Swal.fire("Error!", "Something is wrong.", "error"));
    },
  });

  return (
    <div className="order-page-container">
      <form className="user-data" onSubmit={formik.handleSubmit}>
        <TextField
          className="full-width"
          label="Full Name*"
          type="text"
          variant="outlined"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <Box className="flex-wrap">
          <TextField
            className="half-width"
            label="Email*"
            type="email"
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
            label="Phone Number*"
            type="text"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Box>
        <TextField
          className="full-width"
          label="Adress*"
          type="text"
          variant="outlined"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          className="full-width"
          id="outlined-multiline-static"
          label="Note"
          multiline
          rows={6}
          name="orderNotes"
          value={formik.values.orderNotes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.orderNotes && Boolean(formik.errors.orderNotes)}
          helperText={formik.touched.orderNotes && formik.errors.orderNotes}
        />
        <Button className="place-order-btn" type="submit">
          Place Order
        </Button>
      </form>
      <Box className="order-data">
        <Box className="top">
          <Typography variant="h4" className="title">
            Your Order
          </Typography>
          <Divider />
          {slicedOrders.map((order: ICartProduct) => {
            return (
              <div key={order.id}>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography>{order.name}</Typography>
                    <Typography>x{order.count}</Typography>
                  </Box>

                  <Typography>
                    {order.salePrice -
                      (order.salePrice * order.discountPercent) / 100}
                    $
                  </Typography>
                </Box>
                <Divider />
              </div>
            );
          })}
        </Box>
        <Box className="bottom">
          {state?.orderedProducts.length > 6 && (
            <Box className="pagination-box">
              <Pagination
                count={
                  state?.orderedProducts !== undefined
                    ? Math.ceil(state?.orderedProducts.length / 6)
                    : 1
                }
                page={activePage}
                onChange={(e, newPage) => setActivePage(newPage)}
                showFirstButton
                variant="outlined"
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
          <Box className="total-amount">
            <Typography className="text">Total Amount:</Typography>
            <Typography className="text">
              {state?.orderedProducts
                ?.reduce(
                  (total: number, product: ICartProduct) =>
                    total +
                    product.salePrice * product.count -
                    (product.salePrice *
                      product.count *
                      product.discountPercent) /
                      100,
                  0
                )
                .toFixed(2)}
              $
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
