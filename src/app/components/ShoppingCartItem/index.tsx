import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { ICartProduct, IShoppingCartItem } from "../../../models";
import { useCartItemContext } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./style.scss";

interface ICartItem {
  product: ICartProduct;
}

export const ShoppingCartItem: React.FC<ICartItem> = ({ product }) => {
  const {
    mutateCartItem,
    localCart,
    setLocalCart,
    mutateRemoveItem,
    mutateReduceCartItem,
  } = useCartItemContext();
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
      mutateReduceCartItem({ productId });
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
    } else {
      mutateRemoveItem(productId);
    }
  };

  return (
    <Paper elevation={3} className="shopping-cart-item">
      <div className="left-side">
        <img src={product.thumbnail} alt="cart-item" />
        <div className="middle-container">
          <Typography className="title">{product.title}</Typography>
         
         <div className="count-container">
         <Button
         className="counter-btn"
            disabled={product.count === 1}
            onClick={() => handleReduce(product.id)}
          >
            -
          </Button>
          <span className="product-count">{product.count}</span>

          <Button className="counter-btn" onClick={() => handlePlus(product.id)}>+</Button>
         </div>

          <div className="price-container">
            <Typography
              className={
                product.discountPercentage > 0
                  ? "product-price-disc"
                  : "product-price"
              }
            >
              Price:{product.price.toFixed(2)}$
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography className="discounted-price">
                Discounted Price: 
                {(
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
                $
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="right-side">
        <Button className="remove-btn" onClick={() => handleRemove(product.id)}>
          Remove
        </Button>
        <Typography className="total-price">
          Total Price:{" "}
          {(
            product.price * product.count -
            (product.price * product.count * product.discountPercentage) / 100
          ).toFixed(2)}
          $
        </Typography>
      </div>
    </Paper>
  );
};
