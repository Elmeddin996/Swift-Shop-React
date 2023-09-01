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

interface IProductCard {
  data: IProduct;
}

export const ProductCard: React.FC<IProductCard> = ({ data }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`${ROUTES.PRODUCT.DETAIL}/${data.id}`);
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            className={`purchase`}
          >
            {data.price} $
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
