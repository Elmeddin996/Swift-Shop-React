import React from "react";
import "./style.scss";
import { Typography } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import { useService } from "../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../enums";

export const Contact = () => {
  const { siteDatasService } = useService();

  const { data: siteDatas } = useQuery([EQueryKeys.GET_SITE_DATAS], () =>
    siteDatasService.getSiteDatas()
  );
  

  return (
    <div className="contact-page-container">
      <div className="contact-infarmation">
        <Typography className="title">
          <StoreIcon />
          {siteDatas?.data.companyName}
        </Typography>
        <Typography className="adress">
            <LocationOnIcon />
          {siteDatas?.data.address}
        </Typography>
        <Typography className="phone">
            <PhoneIcon /> {siteDatas?.data.phone}
        </Typography>
        <Link to={siteDatas?.data.whatsappLink} className="whatsapp sosial">
            <WhatsAppIcon /> WhatsApp
          </Link>
        <Link
          to={siteDatas?.data.facebookLink}
          className="facebook sosial"
        >
          <FacebookIcon fontSize="large" />
          Facebook
        </Link>
        <Link
          to={siteDatas?.data.instagramLink}
          className="instagram sosial"
        >
          <InstagramIcon fontSize="large" />
          Instagram
        </Link>
        <Link
          to={
            siteDatas?.data.linkedinLink
          }
          className="linkedin sosial"
        >
          <LinkedInIcon fontSize="large" />
          Linkedin
        </Link>
      </div>
      <div className="map-container">
        <iframe
          id="google-map"
          title="Swift Shop Map"
          width="100%"
          height="500"
          scrolling="no"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=28%20MALL,%20Baku,%20Azerbaijan+(Swift%20Shop)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>
    </div>
  );
};
