import React from 'react'
import {Grid } from "@mui/material";
import { ProductCard } from '../ProductCard';
import { IProduct } from '../../../models';
import "./style.scss";

interface IProductList{
    products:IProduct[]
}

export const ProductList:React.FC<IProductList> = ({products}) => {
  return (
    <Grid container spacing={6} className="product-list">
    {products?.map((data: IProduct) => {
      return <ProductCard key={data.id} data={data} />;
    })}
  </Grid>
  )
}
