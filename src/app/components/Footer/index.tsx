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

export const Footer:React.FC = () => {
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
          <img src={siteDatas?.data.logoImageLink} alt="Logo" />
          <Typography className="logo-text">
            {siteDatas?.data.logoText}
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

        <p className="footer-company-name">{siteDatas?.data.companyName} © 2010</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>{siteDatas?.data.address}</p>
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
        <p className="footer-company-about">{siteDatas?.data.aboutCompany}</p>

        <div className="footer-icons">
          <Link to={siteDatas?.data.facebookLink}>
            <FacebookIcon />
          </Link>
          <Link to={siteDatas?.data.instagramLink}>
            <InstagramIcon />
          </Link>
          <Link to={siteDatas?.data.linkedinLink}>
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
