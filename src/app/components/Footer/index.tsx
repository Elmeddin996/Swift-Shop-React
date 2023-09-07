import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";
import { useQuery } from "react-query";
import { useService } from "../../../APIs/Services";
import { EQueryKeys } from "../../../enums";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";

export const Footer = () => {
  const { siteDatasService } = useService();
  const { data: siteDatas } = useQuery([EQueryKeys.GET_SITE_DATAS], () =>
    siteDatasService.getSiteDatas()
  );
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <div className="logo">
          <img src={siteDatas?.data.logoImgUrl} alt="Logo" />
          <Typography className="logo-text">SwiftShop</Typography>
        </div>

        <p className="footer-links">
          <Link to={ROUTES.HOME} className="link-1">
            Home
          </Link>

          <Link to={ROUTES.PRODUCT.LIST}>Shop</Link>

          <Link to={ROUTES.ABOUT}>About</Link>

          <Link to={ROUTES.CONTACT_US}>Contact</Link>
        </p>

        <p className="footer-company-name">Swift Shop © 2015</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>444 S. Cedros Ave</span> Solana Beach, California
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+1.555.555.5555</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">support@company.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <Link to={ROUTES.ABOUT}>About the company</Link>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className="footer-icons">
          <Link to={ROUTES.CONTACT_US}>
            <FacebookIcon />
          </Link>
          <Link to={ROUTES.CONTACT_US}>
            <InstagramIcon />
          </Link>
          <Link to={ROUTES.CONTACT_US}>
            <LinkedInIcon />
          </Link>
          <Link to={ROUTES.CONTACT_US}>
            <GitHubIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};
