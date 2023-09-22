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
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

  const addToCart = (productId: number) => {
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
    <Grid item lg={3.5} md={4.5} sm={8} xs={10} className={`card-container`}>
      <Card sx={{ maxWidth: 345}} className="product-card">
        <CardActionArea onClick={goToDetail}>
          <CardContent>
          <CardMedia
            component="img"
            height="140"
            image={data?.imageUrl}
            alt="img"
          />
            <Typography gutterBottom variant="h5" component="div">
              {data.name?.length>30?data.name.slice(0,30)+"...":data.name}
            </Typography>
            <Typography className="card-description" variant="body2" color="text.secondary">
            {data.description.length > 45
            ? data.description.slice(0, 45) + "..."
            : data.description}
            </Typography>
            <Typography>{data.salePrice} $</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{display:"flex", flexDirection:"column", width:"100%"}}>
          <Button
            className="cart-action-btn"
            onClick={goToDetail}
          >
          <InfoOutlinedIcon/>
            Go To Detail</Button>
          <Button
            variant="outlined"
            className="cart-action-btn"
            onClick={() => addToCart(data.id)}
          >
            <ShoppingBagOutlinedIcon/>
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
