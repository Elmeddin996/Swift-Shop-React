import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./style.scss";
import { useService } from "../../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../../enums";
import { ISlider } from "../../../models";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";

export const Slider: React.FC = () => {
  const { sliderService } = useService();
  const navigate=useNavigate();

  const { data: sliderData } = useQuery([EQueryKeys.GET_SLIDER_DATA], () =>
    sliderService.getSlider()
  );

  return (
    <>
      <Carousel className="carousel-main">
        {sliderData?.data.map((slider: ISlider) => (
          <Paper key={slider.id} elevation={3} className="slider-content" style={{
            padding: "20px",
            backgroundImage: `url(${slider.imageUrl})`,
            backgroundSize: "cover", // İsteğinize göre ayarlayabilirsiniz
            backgroundPosition: "center", // İsteğinize göre ayarlayabilirsiniz
          }}>
           
              <Typography variant="h5" className="title">{slider.title}</Typography>
              <Typography className="description">{slider.desc}</Typography>
              <Button className="shop-btn" onClick={()=>navigate(ROUTES.PRODUCT.LIST)}>See What's in Store...</Button>
          </Paper>
        ))}
      </Carousel>
    </>
  );
};
