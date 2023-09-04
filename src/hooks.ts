import React from "react";

import { ProductContext } from "./context/ProductContext";
import { AuthContext } from "./context/AuthContext";
import { ShoppingCartContext } from "./context/ShoppingCartContext";

export const useProductContext =()=>React.useContext(ProductContext);
export const useAuthentication =()=>React.useContext(AuthContext);
export const useCartItemContext =()=>React.useContext(ShoppingCartContext);

