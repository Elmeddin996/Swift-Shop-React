import React from "react";
import { Typography, Paper, Button, Divider, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import "./style.scss";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../enums";
import { useService } from "../../APIs/Services";
import { useCartItemContext } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IShoppingCartItem } from "../../models";
import Carousel from "better-react-carousel";

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { productService } = useService();
  const { localCart, setLocalCart, mutateCartItem } = useCartItemContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );

  const { data: product } = useQuery([EQueryKeys.GET_PRODUCT_BY_ID], () =>
    id ? productService.getProductById(id) : null
  );

  const [currentImage, setCurrentImage] = React.useState<string>();

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
      const userId = localStorage.getItem("userId");
      mutateCartItem({ productId, userId });
    }
  };

  return (
    <div className="product-detail-container">
      <Paper elevation={3} className="detail-paper">
        <div className="images-container">
          <div className="product-image">
            <img
              src={
                currentImage === undefined
                  ? product?.data.thumbnail
                  : currentImage
              }
              alt={product?.data.title}
            />
          </div>
          <div className="product-images">
            <Carousel cols={3} rows={1} gap={1} loop>
              {product?.data.images.map((img: string, index: number) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      alt={product?.data.title}
                      onClick={() => setCurrentImage(img)}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </div>
        <div className="product-info">
          <Typography variant="h1" className="product-name">
            {product?.data.title}
          </Typography>
          <Rating
            name="read-only"
            value={
              product?.data?.rating !== undefined ? product?.data.rating : 4.5
            }
            readOnly
          />
          <Typography variant="body1" className="product-category">
            <span>Category:</span> {product?.data.category}
          </Typography>
          <Divider />

          <Typography variant="h6" className="product-brand">
            <span>Brand:</span> {product?.data.brand}
          </Typography>
          <Divider />
          <Typography variant="body1" className="description">
            {product?.data.description}
          </Typography>
          <Typography
            className={
              product?.data.discountPercentage > 0
                ? "product-price-disc"
                : "product-price"
            }
          >
            Price:{product?.data.price.toFixed(2)}$
          </Typography>
          <Divider />
          {product?.data.discountPercentage > 0 && (
            <Typography className="discounted-price">
              Discounted Price:
              {(
                product?.data.price -
                (product?.data.price * product?.data.discountPercentage) / 100
              ).toFixed(2)}
              $
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={() => addToCart(product?.data.id)}
          >
            Add To Card
          </Button>
        </div>
      </Paper>
    </div>
  );
};
