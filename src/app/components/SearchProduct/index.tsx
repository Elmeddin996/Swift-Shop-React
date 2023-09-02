import React from 'react'
import {  TextField, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useProductContext } from '../../../hooks';

export const SearchProduct:React.FC = () => {
  const { setFilteredProducts, productList} = useProductContext();

  return (
    <TextField
    fullWidth
    sx={{bgcolor:"white", width:"90%"}}
    id="standard-bare"
    placeholder='Search'
    variant="outlined"
    InputProps={{
      endAdornment: (
        <IconButton>
          <SearchOutlined />
        </IconButton>
      ),
    }}
  />
  )
}
