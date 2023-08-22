import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { ROUTES } from "../../../routes/consts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { LoginRegisterBtn } from "../LoginRegisterBtn";
import { NavLink } from "react-router-dom";

interface Props{
isLogined: boolean
}

export const DrawerMenu: React.FC<Props> = ({isLogined}) => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);

  return (
    <>
      <Drawer
        PaperProps={{
          sx: { background: "rgba(100,77,0,1)" },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {isLogined ? (
          <Button color="inherit" sx={{ marginLeft: "10px" }}>
            <AccountBoxIcon fontSize="large" />
            Profile
          </Button>
        ) : (
          <LoginRegisterBtn />
        )}

        <List>
          <NavLink to={ROUTES.HOME} onClick={() => setOpenDrawer(!openDrawer)}>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                >
                  Home
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NavLink>
          <NavLink to={ROUTES.PRODUCT.LIST} onClick={() => setOpenDrawer(!openDrawer)}>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                >
                  Products
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NavLink>
          <NavLink to={ROUTES.SHOP} onClick={() => setOpenDrawer(!openDrawer)}>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                >
                  Shop
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NavLink>
          <NavLink to={ROUTES.CONTACT_US} onClick={() => setOpenDrawer(!openDrawer)}>
            <ListItemButton>
              <ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                >
                  Contact
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </NavLink>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};
