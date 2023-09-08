import React from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";
import { useQuery } from "react-query";
import { useService } from "../../../APIs/Services";
import { EQueryKeys } from "../../../enums";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Typography } from "@mui/material";

export const Footer = () => {
  const { siteDatasService } = useService();
  const { data: siteDatas } = useQuery([EQueryKeys.GET_SITE_DATAS], () =>
    siteDatasService.getSiteDatas()
  );

  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <footer
      style={
        currentPath === "/shop" ? { display: "none" } : { display: "block" }
      }
      className="footer-distributed"
    >
      <div className="footer-left">
        <div className="logo">
          <img src={siteDatas?.data.logoImgUrl} alt="Logo" />
          <Typography className="logo-text">
            {siteDatas?.data.companyName}
          </Typography>
        </div>

        <p className="footer-links">
          <Link to={ROUTES.HOME} className="link-1">
            Home
          </Link>

          <Link to={ROUTES.PRODUCT.LIST}>Shop</Link>

          <Link to={ROUTES.ABOUT}>About</Link>

          <Link to={ROUTES.CONTACT_US}>Contact</Link>
        </p>

        <p className="footer-company-name">Swift Shop © 2010</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>{siteDatas?.data.adress}</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>{siteDatas?.data.phone}</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <Link to={ROUTES.CONTACT_US}>Contact Us</Link>
          </p>
        </div>
      </div>

      <div className="footer-right">
       <p> <Link to={ROUTES.ABOUT}>About the company</Link></p>
        <p className="footer-company-about">
          Swift Shop is a leading electronic sales platform that has been
          serving customers since its inception in 2010. Our journey began in
          the vibrant city of Baku, Azerbaijan, and over the years, we've grown
          into a trusted name in the world of e-commerce.
        </p>

        <div className="footer-icons">
          <Link to={siteDatas?.data.facebook}>
            <FacebookIcon />
          </Link>
          <Link to={siteDatas?.data.instagram}>
            <InstagramIcon />
          </Link>
          <Link to={siteDatas?.data.linkedin}>
            <LinkedInIcon />
          </Link>
          <Link to={siteDatas?.data.whatsappLink}>
            <WhatsAppIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};
