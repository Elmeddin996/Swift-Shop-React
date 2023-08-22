import React from 'react'
import {
    Typography,
    Paper,
    Divider,
  } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './style.scss'

export const ProductDetail = () => {
    const location = useLocation();
  const data = location.state;
console.log(data);
  return (
    <div className="product-detail-container">
    <Paper elevation={3} className="detail-paper">
      <div className="product-image">
        <img
          src={data.thumbnail}
          alt={data.title}
        />
      </div>
      <div className="product-info">
        <Typography variant="h4" className="product-name">
          {data.title}
        </Typography>
        <Divider />
        <Typography variant="body1" className="description">
          {data.description}
        </Typography>
      </div>
    </Paper>
  </div>
  )
}
