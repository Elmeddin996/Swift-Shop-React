import React from "react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import "./style.scss";
import { Box, Typography } from "@mui/material";
import { useCartItemContext, useProductContext } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ICartProduct, IProduct, IShoppingCartItem } from "../../models";
import { EmptyShoppingCart } from "../components/EmptyShoppingCart";

export const ShoppingCart = () => {
  const { mainCart, localCart } = useCartItemContext();
  const { productList } = useProductContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  const cartCount = useSelector(
    (state: RootState) => state.cartCount.cartCount
  );
  const [carts, setCarts] = React.useState<IShoppingCartItem[]>();
  const [cartProducts, setCartProducts] = React.useState<ICartProduct[]>();

  React.useEffect(() => {
    if (isAuthenticated) {
      const cartData = mainCart?.data;
      setCarts(cartData);
    } else {
      setCarts(localCart);
    }
  }, [isAuthenticated, mainCart, setCarts, localCart]);

  React.useEffect(() => {
    const cartProduct = carts
      ?.map((cartItem: IShoppingCartItem) => {
        const product = productList?.data.find(
          (product: IProduct) => product.id === cartItem.productId
        );
        if (product) {
          return {
            ...product,
            count: cartItem.count,
          };
        }
        return null;
      })
      .filter((product: IProduct) => product !== null);
    setCartProducts(cartProduct);
  }, [carts, productList]);

  return (
    <div className="shopping-cart">
      <Typography className="shopping-cart-title">
        ░▒▓█ Shopping Cart █▓▒░
      </Typography>

      <Box className="shopping-cart-item-container">
        {cartCount > 0 && (
          <Box className="total-amount">
            <Typography>Total Amount</Typography>
            <Typography>
              {cartProducts?.reduce(
                (total, product) =>
                  total +
                  product.price *product.count -
                  (product.price *product.count* product.discountPercentage) / 100,
                0
              ).toFixed(2)}
              $
            </Typography>
          </Box>
        )}
        {cartProducts?.map((product: ICartProduct) => {
          return <ShoppingCartItem product={product} key={product.id} />;
        })}
        {cartCount === 0 && <EmptyShoppingCart />}
      </Box>
    </div>
  );
};
