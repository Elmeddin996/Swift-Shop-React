import React from "react";
import { ShoppingCartItem } from "../components/ShoppingCartItem";
import "./style.scss";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { useCartItemContext, useProductContext } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ICartProduct, IProduct, IShoppingCartItem } from "../../models";
import { EmptyShoppingCart } from "../components/EmptyShoppingCart";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const ShoppingCart = () => {
  const { mainCart, localCart } = useCartItemContext();
  const { productList } = useProductContext();
  const navigate =useNavigate()
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  const cartCount = useSelector(
    (state: RootState) => state.cartCount.cartCount
  );
  const [carts, setCarts] = React.useState<IShoppingCartItem[]>();
  const [cartProducts, setCartProducts] = React.useState<ICartProduct[]>();

  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 6;
  const slicedProducts = cartProducts?.slice(startIndex, startIndex + 6);

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

  React.useEffect(() => {
    if (cartCount <= 6) {
      setActivePage(1);
    }
  }, [cartCount]);

const handleOrder=(orderedProducts:ICartProduct[]|undefined)=>{
   if (orderedProducts!==undefined) {
     navigate(ROUTES.ORDER, {state:{orderedProducts:orderedProducts}})
   }
}

  return (
    <div className="shopping-cart">
      <Typography className="shopping-cart-title">
        ░▒▓█ Shopping Cart █▓▒░
      </Typography>

      <Box className="shopping-cart-item-container">
        {cartCount > 0 && (
          <Box className="total-amount">
            <div className="left-side">
              <Typography>Total Amount:</Typography>
              <Typography>
                {cartProducts
                  ?.reduce(
                    (total, product) =>
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
            </div>
            <Button className="order-btn" onClick={()=>handleOrder(cartProducts)}>
              Check Out 
              <KeyboardDoubleArrowRightIcon/>
            </Button>
          </Box>
        )}
        {slicedProducts?.map((product: ICartProduct) => {
          return <ShoppingCartItem product={product} key={product.id} />;
        })}
        {cartCount !== 0 && (
          <Box className="pagination-box">
            <Pagination
              count={
                cartProducts !== undefined
                  ? Math.ceil(cartProducts?.length / 6)
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
        {cartCount === 0 && <EmptyShoppingCart />}
      </Box>
    </div>
  );
};
