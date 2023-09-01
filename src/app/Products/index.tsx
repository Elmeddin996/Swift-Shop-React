import * as React from "react";
import { useProductContext } from "../../hooks";
import { ProductList } from "../components/ProductList";
import "./style.scss";
import { SideBar } from "../components/SideBar";
import { PriceFilterRange } from "../components/PriceFilterRange";

export const ProductPage = () => {
  const { filteredProducts, setFilteredProducts, productList} = useProductContext();

  return (
    <div>
      <SideBar />
      <div className="search-filter-container">
      <PriceFilterRange productList={productList?.data} setProducts={setFilteredProducts}/>
      </div>
      <div className="product-container">
        <ProductList products={filteredProducts} />
      </div>
    </div> 

  );
};
