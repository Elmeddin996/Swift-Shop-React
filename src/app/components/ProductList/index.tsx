import React from 'react'
import {Grid } from "@mui/material";
import { ProductCard } from '../ProductCard';
import { IProduct } from '../../../models';
import "./style.scss";
import { useProductContext } from '../../../hooks';


export const ProductList:React.FC = () => {
  const { filteredProducts} = useProductContext();

  return (
    <Grid container spacing={6} className="product-list">
    {filteredProducts?.map((data: IProduct) => {
      return <ProductCard key={data.id} data={data} />;
    })}
  </Grid>
  )
}
