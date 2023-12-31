import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DrawerMenu } from "./DrawerMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";
import { LoginRegisterBtn } from "../LoginRegisterBtn";
import "./style.scss";
import { useService } from "../../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../../enums";
import { ProfileIcon } from "../ProfileIcon";
import { LogoutIcon } from "../LogoutIcon";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../features/userLogined/loginSlice";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<Number>(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { siteDatasService } = useService();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  const cartCount = useSelector(
    (state: RootState) => state.cartCount.cartCount
  );

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
  }, [dispatch]);

  React.useEffect(() => {
    const savedTabValue = localStorage.getItem("tabValue");
    if (savedTabValue !== null) {
      setTabValue(Number(savedTabValue));
    }
  }, []);

  React.useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTabValue(1);
        break;
      case "/shop":
        setTabValue(2);
        break;
      case "/about":
        setTabValue(3);
        break;
      case "/contact":
        setTabValue(4);
        break;
      default:
        setTabValue(0);
        break;
    }
  }, [location.pathname]);

  const handleChangePage = (value: number) => {
    setTabValue(value);
    localStorage.setItem("tabValue", String(value));
    switch (value) {
      case 1:
        navigate(ROUTES.HOME);
        break;
      case 2:
        navigate(ROUTES.PRODUCT.LIST);
        break;
      case 3:
        navigate(ROUTES.ABOUT);
        break;
      case 4:
        navigate(ROUTES.CONTACT_US);
        break;

      default:
        break;
    }
  };

  const { data: siteDatas } = useQuery([EQueryKeys.GET_SITE_DATAS], () =>
    siteDatasService.getSiteDatas()
  );
  return (
    <AppBar
      className="navbar"
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.9976365546218487) 0%, rgba(100,77,0,1) 42%, rgba(252,194,1,1) 100%)",
      }}
    >
      <Toolbar>
        {isMatch ? (
          <Grid container>
            <Grid
              item
              sm={6}
              xs={6}
              className="logo-container"
              onClick={() => {
                navigate(ROUTES.HOME);
                setTabValue(1);
              }}
            >
              <img
                className="img-sm-logo"
                src={siteDatas?.data.logoImageLink}
                alt="logo"
              />
               <h1 style={{ fontSize: 25 }}>
                  {siteDatas?.data.logoText}
                </h1>
            </Grid>
            <Grid item sm={3} xs={3}>
              <Link to={ROUTES.SHOPPING_CART} className="shopping-cart-icon">
                <ShoppingCartCheckoutIcon sx={{fontSize:40}}/>
                <span>{cartCount>0?cartCount:""}</span>
              </Link>
            </Grid>
            <DrawerMenu isLogined={isAuthenticated} />
          </Grid>
        ) : (
          <Grid container sx={{ placeItems: "center" }}>
            <Grid
              item
              xs={3}
              sm={2}
              className="logo-container"
              onClick={() => {
                navigate(ROUTES.HOME);
                setTabValue(1);
              }}
            >
              <img
                className="img-sm-logo"
                src={siteDatas?.data.logoImageLink}
                alt=""
              />
                <h1 style={{ fontSize: 20 }}>
                  {siteDatas?.data.logoText}
                </h1>
            </Grid>
            <Grid item xs={5.5} sm={6.4}>
              <Tabs
                className={
                  tabValue === 0 ? "custom-tabs-none-indicator" : "custom-tabs"
                }
                textColor="inherit"
                value={tabValue}
                onChange={(e, value) => handleChangePage(value)}
              >
                <Tab disabled className="disabled-tab" /> 
                <Tab label="Home" />
                <Tab label="Shop" />
                <Tab label="About" />
                <Tab label="Contact" />
              </Tabs>
            </Grid>

            <Grid item xs={0.5} sm={0.6}>
              <Link to={ROUTES.SHOPPING_CART} className="shopping-cart-icon">
                <ShoppingCartCheckoutIcon sx={{fontSize:30}} />
                <span>{cartCount>0?cartCount:""}</span>
              </Link>
            </Grid>

            {isAuthenticated ? (
              <>
                <Grid item xs={1.5}>
                  <ProfileIcon />
                </Grid>
                <Grid item xs={1.5}>
                  <LogoutIcon />
                </Grid>
              </>
            ) : (
              <Grid item xs={3}>
                <LoginRegisterBtn  isLogined={isAuthenticated} />
              </Grid>
              
            )}
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
