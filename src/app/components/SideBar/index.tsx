import React from "react";
import { Category } from "./Category";
import { useProductContext } from "../../../hooks";
import "./style.scss";
import { ChooseBtn } from "./ChooseBtn";
import { Button } from "@mui/material";

import { Brand } from "./Brand";

export const SideBar: React.FC = () => {
  const [selectedFilterValue, setSelectedFilterValue] =
    React.useState<string>("");

  const { productList, setFilteredProducts } = useProductContext();
  const [selectedBtnValue, setSelectedBtnValue] =
    React.useState<string>("Category");

  React.useEffect(() => {
    setFilteredProducts(productList?.data);
  }, [productList, setFilteredProducts]);

  return (
    <div className="side-bar">
      <Button
        className="all-products-btn"
        onClick={() => {
          setFilteredProducts(productList?.data);
          setSelectedFilterValue("");
        }}
      >
        All Products
      </Button>
      <ChooseBtn
        selectedValue={selectedBtnValue}
        setSelectedValue={setSelectedBtnValue}
      />

      {selectedBtnValue === "Category" ? (
        <Category
          productList={productList?.data}
          setFilteredProducts={setFilteredProducts}
          setSelectedFilterValue={setSelectedFilterValue}
          selectedFilterValue={selectedFilterValue}
        />
      ) : (
        <Brand
          productList={productList?.data}
          setFilteredProducts={setFilteredProducts}
          setSelectedFilterValue={setSelectedFilterValue}
          selectedFilterValue={selectedFilterValue}
        />
      )}
    </div>
  );
};
