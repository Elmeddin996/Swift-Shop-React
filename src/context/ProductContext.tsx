import React from "react";
import { useService } from "../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../enums";

export const ProductContext = React.createContext(null as any);

export const ProductProvider: React.FC<any> = ({ children }: any) => {
  const { productService } = useService();

  const { data: productList } = useQuery([EQueryKeys.GET_PRODUCT_LIST], () =>
    productService.getProductList()
  );
 
  return (
    <ProductContext.Provider value={{ productList }}>
      {children}
    </ProductContext.Provider>
  );
};
