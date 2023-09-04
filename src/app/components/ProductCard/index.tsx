import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";
import { IProduct } from "../../../models";
import { useCartItemContext } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IProductCard {
  data: IProduct;
}

interface ICartItem {
  productId: number;
  count: number;
}

export const ProductCard: React.FC<IProductCard> = ({ data }) => {
  const { localCart, setLocalCart,mainCart, mutateCartItem } = useCartItemContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`${ROUTES.PRODUCT.DETAIL}/${data.id}`);
  };

  const addToCart = (productId: number) => {
    if (!isAuthenticated) {
      const existingItem = localCart?.find(
        (item: ICartItem) => item.productId === productId
      );
      if (existingItem) {
        const updatedCart = [...localCart];
        existingItem.count++;
        setLocalCart(updatedCart);
      } else {
        const updatedCart = [...localCart, { productId, count: 1 }];
        setLocalCart(updatedCart);
      }
    } else {
      const existingItem = mainCart?.data.find(
        (item: ICartItem) => item.productId === productId
      );
      if (existingItem) {
        const updatedItem ={
          ...existingItem,
          count:existingItem.count + 1
        }
        mutateCartItem(updatedItem);
      } else {
       const userId = localStorage.getItem("userId")
        const newCart = { productId, count: 1, userId:userId };
        mutateCartItem(newCart);
      }
    }
  };

  return (
    <Grid item md={3.5} sm={5} xs={10} className={`card-container`}>
      <Card sx={{ maxWidth: 345 }} className="product-card">
        <CardActionArea onClick={goToDetail}>
          <CardMedia
            component="img"
            height="140"
            image={data.thumbnail}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
            <Typography>{data.price} $</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="large"
            color="primary"
            variant="outlined"
            className={`purchase`}
            onClick={() => addToCart(+data.id)}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
