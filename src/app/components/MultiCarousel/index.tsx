import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IProduct } from "../../../models";
import { MultiCarouselCard } from "../MultiCarouselCard";
import Typography from "@mui/material/Typography";

interface IMultiCarouselProps {
  products: IProduct[];
  color: string;
  discounted?:boolean
}

export const MultiCarousel: React.FC<IMultiCarouselProps> = ({
  products,
  color,
  discounted
}) => {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      {products && (
        <div>
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: 35,
              bgcolor:color,
              borderRadius:"40%"
            }}
          >
            {discounted? "Discounted": products[0].brand} Products
          </Typography>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
            keyBoardControl={true}
            customTransition="all .2"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {products.map((product: IProduct | any) => {
              return (
                <MultiCarouselCard
              
                  key={product.id}
                  product={product}
                  color={color}
                />
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
};
