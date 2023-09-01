import React from 'react'
import {
    Typography,
    Paper,
    Button,
    Divider,
  } from '@mui/material';
import {useParams } from 'react-router-dom';
import './style.scss'
import { useQuery } from 'react-query';
import { EQueryKeys } from '../../enums';
import { useService } from '../../APIs/Services';


export const ProductDetail:React.FC = () => {
  const  {id}  = useParams()
  const { productService } = useService();

  const { data: product } = useQuery([EQueryKeys.GET_PRODUCT_BY_ID], () =>
  id ? productService.getProductById(id):null
  );

  return (
    <div className="product-detail-container">
    <Paper elevation={3} className="detail-paper">
      <div className="product-image">
        <img
          src={product?.data.thumbnail}
          alt={product?.data.title}
        />
      </div>
      <div className="product-info">
        <Typography variant="h1" className="product-name">
          {product?.data.title}
        </Typography>
        <Typography variant="h6" className="product-brand">
          {product?.data.brand}
        </Typography>
        <Typography variant="body1" className="product-category">
          {product?.data.category}
        </Typography>
        <Divider />
        <Typography variant="body1" className="description">
          {product?.data.description}
        </Typography>
      <Button variant='contained'>Add To Card   {product?.data.price}$</Button>
      </div>
    </Paper>
  </div>
  )
}
