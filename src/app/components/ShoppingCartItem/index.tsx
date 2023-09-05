import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { ICartProduct, IShoppingCartItem } from "../../../models";
import { useCartItemContext } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ICartItem {
  product: ICartProduct;
}

export const ShoppingCartItem: React.FC<ICartItem> = ({ product }) => {
  const {mutateCartItem, localCart, setLocalCart, mutateRemoveItem,mutateReduceCartItem} =
    useCartItemContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );

  const handleReduce = (productId: string) => {
    if (!isAuthenticated) {
      const updatedCarts = localCart?.map((cartItem: IShoppingCartItem) => {
        if (cartItem.productId === productId && cartItem.count > 1) {
          return {
            ...cartItem,
            count: cartItem.count - 1,
          };
        }
        return cartItem;
      });
      setLocalCart(updatedCarts);
    } else {
      mutateReduceCartItem({productId})
    }
  };

  const handlePlus = (productId: string) => {
    if (!isAuthenticated) {
      const updatedCarts = localCart?.map((cartItem: IShoppingCartItem) => {
        if (cartItem.productId.toString() === productId) {
          return {
            ...cartItem,
            count: cartItem.count + 1,
          };
        }
        return cartItem;
      });
      setLocalCart(updatedCarts);
    } else {
      const userId = localStorage.getItem("userId");
      mutateCartItem({ productId, userId });
    }
  };
  
  const handleRemove = (productId: string) => {
   if (!isAuthenticated) {
     const updatedCarts = localCart?.filter(
       (cartItem: IShoppingCartItem) => cartItem.productId !== productId
     );
     setLocalCart(updatedCarts);
   }else{
    mutateRemoveItem(productId)
   }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ width: "100%", display: "flex" }}>
        <img src={product.thumbnail} style={{ width: 100 }} alt="cart-item" />
        <div>
          <Typography>{product.title}</Typography>
          <Button
            disabled={product.count === 1}
            onClick={() => handleReduce(product.id)}
          >
            -
          </Button>
          <span>{product.count}</span>
          <Button onClick={() => handlePlus(product.id)}>+</Button>
        </div>
        <Button onClick={() => handleRemove(product.id)}>Remove</Button>
      </Paper>
    </Box>
  );
};
