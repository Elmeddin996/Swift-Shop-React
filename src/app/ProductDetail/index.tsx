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
import { useCartItemContext } from '../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IShoppingCartItem } from '../../models';


export const ProductDetail:React.FC = () => {
  const  {id}  = useParams()
  const { productService } = useService();
  const { localCart, setLocalCart, mutateCartItem } =
  useCartItemContext();
const isAuthenticated = useSelector(
  (state: RootState) => state.isLogined.isAuthenticated
);

  const { data: product } = useQuery([EQueryKeys.GET_PRODUCT_BY_ID], () =>
  id ? productService.getProductById(id):null
  );


const addToCart = (productId: string) => {
  if (!isAuthenticated) {
    const existingItem = localCart?.find(
      (item: IShoppingCartItem) => item.productId === productId
    );
    if (existingItem) {
      const updatedCart = [...localCart];
      existingItem.count++;
      setLocalCart(updatedCart);
    } else {
      const updatedCart = [...localCart, { productId, count: 1 }];
      setLocalCart(updatedCart);
    }
  } else {
    const userId = localStorage.getItem("userId")
    mutateCartItem({productId, userId});
  }
};

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
      <Button variant='contained' onClick={()=>addToCart(product?.data.id)}>Add To Card   {product?.data.price}$</Button>
      </div>
    </Paper>
  </div>
  )
}
