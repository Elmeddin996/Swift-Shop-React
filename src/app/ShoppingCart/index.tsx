import React from "react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import "./style.scss";
import {Typography } from "@mui/material";
import { useCartItemContext, useProductContext } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ICartProduct, IProduct, IShoppingCartItem } from "../../models";

export const ShoppingCart = () => {
  const { mainCart, localCart} = useCartItemContext();
  const { productList } = useProductContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
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
      <Typography>Shopping Cart</Typography>
      {cartProducts?.map((product:ICartProduct) => {
        return (
          <ShoppingCartItem product={product} key={product.id}/>
        );
      })}
    </div>
  );
};
