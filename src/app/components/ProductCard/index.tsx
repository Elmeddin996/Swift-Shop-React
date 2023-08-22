import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import './style.scss';
import { useNavigate} from "react-router-dom";
import { ROUTES } from '../../../routes/consts';



export const ProductCard = ({data}:any) => {

  const navigate = useNavigate();

  const goToDetail =(e:any)=>{
    navigate(ROUTES.PRODUCT.DETAIL, {state: data});
  }

  return (
    <Grid item  md={2.5}  sm={5} xs={8} className={`card-container`}>
    <Card sx={{ maxWidth: 345}} className="product-card">
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={data.thumbnail}
        alt="img"
      />
      <CardContent  onClick={goToDetail}>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" variant='outlined' className={`purchase`}>
        {data.price} $
      </Button>
    </CardActions>
  </Card>
  </Grid>
  )
}
