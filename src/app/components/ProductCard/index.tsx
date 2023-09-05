import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";
import { IProduct, IShoppingCartItem } from "../../../models";
import { useCartItemContext } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IProductCard {
  data: IProduct;
}

export const ProductCard: React.FC<IProductCard> = ({ data }) => {
  const { localCart, setLocalCart, mutateCartItem } =
    useCartItemContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`${ROUTES.PRODUCT.DETAIL}/${data.id}`);
  };

  const addToCart = (productId: string) => {
    if (!isAuthenticated) {
      const existingItem = localCart?.find(
        (item: IShoppingCartItem) => item.productId === productId
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
      const userId = localStorage.getItem("userId")
      mutateCartItem({productId, userId});
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
            onClick={() => addToCart(data.id)}
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
