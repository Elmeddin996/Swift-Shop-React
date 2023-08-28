import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IProduct } from "../../../models";

interface MultiCarouselCardProps {
  product: IProduct;
  color:string
}

export const MultiCarouselCard: React.FC<MultiCarouselCardProps> = ({
  product,
  color
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginLeft: 2,
        marginBottom:5,
        marginTop:3,
        maxHeight: 360,
        minHeight: 360,
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="190"
        image={product.thumbnail.toString()}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title.length > 20
            ? product.title.slice(0, 20)
            : product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.length > 45
            ? product.description.slice(0, 45) + "..."
            : product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large"  variant="contained" sx={{width:"100%", bgcolor:color,color:"black", ":hover":{bgcolor:"black",color:"white"}}}>
          Go To Detail{" "}
        </Button>
      </CardActions>
    </Card>
  );
};
