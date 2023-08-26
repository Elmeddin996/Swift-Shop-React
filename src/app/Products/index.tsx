import * as React from "react";
import { useProductContext } from "../../hooks";
import { ProductCard } from "../components/ProductCard";
import { Grid } from "@mui/material";
import './style.scss'


export const ProductList = () => {
  const { productList } = useProductContext();

  return (
    <Grid container spacing={6} className="product-list">
      {productList?.data.map((data: any) => {
        return (
         <ProductCard key={data.id} data={data}/>
        );
      })}
    </Grid>
  );
};
