import React from "react";

import { ProductContext } from "./context/ProductContext";
import { AuthContext } from "./context/AuthContext";

export const useProductContext =()=>React.useContext(ProductContext);
export const useAuthentication =()=>React.useContext(AuthContext);

