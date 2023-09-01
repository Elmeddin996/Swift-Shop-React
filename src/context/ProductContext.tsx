import React from "react";
import { useService } from "../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../enums";
import { IProduct } from "../models";

export const ProductContext = React.createContext(null as any);

export const ProductProvider: React.FC<any> = ({ children }: any) => {
  const { productService } = useService();

  const { data: productList } = useQuery([EQueryKeys.GET_PRODUCT_LIST], () =>
    productService.getProductList()
  );

  const [filteredProducts, setFilteredProducts]=React.useState<IProduct[]>(productList?.data)
 
  return (
    <ProductContext.Provider value={{ productList, filteredProducts,  setFilteredProducts}}>
      {children}
    </ProductContext.Provider>
  );
};
