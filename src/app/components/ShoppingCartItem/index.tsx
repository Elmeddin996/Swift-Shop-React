import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { ICartProduct, IShoppingCartItem } from "../../../models";
import { useCartItemContext } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./style.scss";
import Swal from "sweetalert2";

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

  const handleReduce = (productId: number) => {
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
      const userId = localStorage.getItem("userId");
      mutateReduceCartItem({productId,userId})
      .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));
    }
  };

  const handlePlus = (productId: number) => {
    if (!isAuthenticated) {
      const updatedCarts = localCart?.map((cartItem: IShoppingCartItem) => {
        if (cartItem.productId === productId) {
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
      mutateCartItem({ productId, userId })
      .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));

    }
  };

  const handleRemove = (productId: number) => {
    if (!isAuthenticated) {
      const updatedCarts = localCart?.filter(
        (cartItem: IShoppingCartItem) => cartItem.productId !== productId
      );
      setLocalCart(updatedCarts);
    } else {
      mutateRemoveItem(productId)
      .catch(()=>Swal.fire("Error!", "Something is wrong.", "error"));

    }
  };

  return (
    <Paper elevation={3} className="shopping-cart-item">
      <div className="left-side">
        <img src={product.imageUrl} alt="cart-item" />
        <div className="middle-container">
          <Typography className="title">{product.name}</Typography>
         
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
                product.discountPercent > 0
                  ? "product-price-disc"
                  : "product-price"
              }
            >
              Price:{product.salePrice.toFixed(2)}$
            </Typography>
            {product.discountPercent > 0 && (
              <Typography className="discounted-price">
                Discounted Price: 
                {(
                  product.salePrice -
                  (product.salePrice * product.discountPercent) / 100
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
            product.salePrice * product.count -
            (product.salePrice * product.count * product.discountPercent) / 100
          ).toFixed(2)}
          $
        </Typography>
      </div>
    </Paper>
  );
};
