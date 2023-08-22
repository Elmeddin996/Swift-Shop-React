import React from "react";

import { ProductContext } from "./context/ProductContext";

export const useProductContext =()=>React.useContext(ProductContext);
