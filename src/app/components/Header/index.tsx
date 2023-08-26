import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  AppBar,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { DrawerMenu } from "./DrawerMenu";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/consts";
import { LoginRegisterBtn } from "../LoginRegisterBtn";
import "./style.scss";
import { useService } from "../../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../../enums";
import Font, { Text } from "react-font";
import { ProfileIcon } from "../ProfileIcon";
import { LogoutIcon } from "../LogoutIcon";
import { RootState } from "../../../store";
import { useDispatch, useSelector} from "react-redux";
import { login, logout } from "../../../features/userLogined/loginSlice";


export const Header: React.FC = () => {
  const [tabValue, setTabValue] = React.useState<Number>(0);
  // const [isLogined, setIsLogined] = React.useState<boolean>(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { siteDatasService } = useService();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isLogined.isAuthenticated
  );
  // const [login, forceUpdate] = React.useReducer(x => x + 1, 0);
  // forceUpdate()
console.log(isAuthenticated);
  React.useEffect(()=>{
  const token = localStorage.getItem("token")
  if (!token) {
    dispatch(logout())
  }else{
    dispatch(login())
  }
   
  },[dispatch])

  const handleChangePage = (value: any) => {
    setTabValue(value);
    switch (value) {
      case 0:
        navigate(ROUTES.HOME);
        break;
      case 1:
        navigate(ROUTES.PRODUCT.LIST);
        break;
      case 2:
        navigate(ROUTES.SHOP);
        break;
      case 3:
        navigate(ROUTES.CONTACT_US);
        break;

      default:
        break;
    }
  };

  const { data: siteDatas} = useQuery([EQueryKeys.GET_SITE_DATAS], () =>
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
              sm={9}
              xs={7}
              className="logo-container"
              onClick={() => {
                navigate(ROUTES.HOME);
                setTabValue(0);
              }}
            >
              <img
                className="img-sm-logo"
                src={siteDatas?.data.logoImgUrl}
                alt=""
              />
              <Font family="Cormorant">
                <Text family="Cormorant" style={{ fontSize: 25 }}>
                  SwiftShop
                </Text>
              </Font>
            </Grid>
            <Grid item sm={2} xs={2}>
              <ShoppingCartCheckoutIcon />
            </Grid>
            <DrawerMenu isLogined={isAuthenticated} />
          </Grid>
        ) : (
          <Grid container sx={{ placeItems: "center" }}>
            <Grid
              item
              xs={3}
              className="logo-container"
              onClick={() => {
                navigate(ROUTES.HOME);
                setTabValue(0);
              }}
            >
              <img
                className="img-sm-logo"
                src={siteDatas?.data.logoImgUrl}
                alt=""
              />
              <Font family="Cormorant">
                <Text family="Cormorant" style={{ fontSize: 20 }}>
                  SwiftShop
                </Text>
              </Font>
            </Grid>
            <Grid item xs={5.5}>
              <Tabs
                indicatorColor="secondary"
                textColor="inherit"
                value={tabValue}
                onChange={(e, value) => handleChangePage(value)}
              >
                <Tab label="Home" />
                <Tab label="Products" />
                <Tab label="Shop" />
                <Tab label="Contact" />
              </Tabs>
            </Grid>

            <Grid item xs={0.5}>
              <Typography>
                <ShoppingCartCheckoutIcon />
              </Typography>
            </Grid>

            {isAuthenticated ? (
          <><ProfileIcon/>
          <LogoutIcon/></>
        ) : (
          <LoginRegisterBtn isLogined={isAuthenticated} />
        )}

          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
