import * as React from "react";
import { ProductList } from "../components/ProductList";
import "./style.scss";
import { SideBar } from "../components/SideBar";
import { PriceFilterRange } from "../components/PriceFilterRange";
import { SearchProduct } from "../components/SearchProduct";

export const ShopPage = () => {
  return (
    <div>
      <SideBar />
      <div className="container">
        <div className="search-filter-container">
          <SearchProduct />
          <PriceFilterRange />
        </div>
        <div className="product-container">
          <ProductList />
        </div>
      </div>
    </div>
  );
};
