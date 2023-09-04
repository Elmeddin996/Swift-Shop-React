import React from "react";
// import { ShoppingCartItem } from "../components/ShoppingCartItem";
import "./style.scss";
import { Button, Typography } from "@mui/material";
import { useCartItemContext, useProductContext } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ICartProduct, IProduct, IShoppingCartItem } from "../../models";

export const ShoppingCart = () => {
  const { mainCart, localCart, setLocalCart } = useCartItemContext();
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
          (product: IProduct) => product.id === cartItem.productId.toString()
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

  const handleReduce = (id: string) => {
    const updatedCarts = localCart?.map((cartItem:IShoppingCartItem) => {
      if (cartItem.productId.toString() === id && cartItem.count > 1) {
        return {
          ...cartItem,
          count: cartItem.count - 1,
        };
      }
      return cartItem;
    });
    setLocalCart(updatedCarts);
  };

  const handlePlus = (id: string) => {
    const updatedCarts = localCart?.map((cartItem:IShoppingCartItem) => {
      if (cartItem.productId.toString() === id) {
        return {
          ...cartItem,
          count: cartItem.count + 1,
        };
      }
      return cartItem;
    });
    setLocalCart(updatedCarts);
  };
   const handleRemove=(id:string)=>{
    const updatedCarts = localCart?.filter((cartItem:IShoppingCartItem) => cartItem.productId.toString() !== id);
    setLocalCart(updatedCarts);
   }

  return (
    <div className="shopping-cart">
      <Typography>Shopping Cart</Typography>
      {cartProducts?.map((product) => {
        return (
          <div key={product.id}>
            <img
              src={product.thumbnail}
              style={{ width: 100 }}
              alt="cart-item"
            />
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
          </div>
        );
      })}
    </div>
  );
};
