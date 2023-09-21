import React from "react";
import { TextField, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useProductContext } from "../../../hooks";
import { IProduct } from "../../../models";

export const SearchProduct: React.FC = () => {
  const {productList, setFilteredProducts, selectedFilterValue, setSelectedFilterValue} = useProductContext();
const [inputValue,setInputValue]=React.useState<string>('')

React.useEffect(() => {
  if (selectedFilterValue === "") {
    setInputValue("");
  }
}, [selectedFilterValue, setInputValue]);


  const handleSearchInput = (value: string) => {
    const filteredProducts = productList?.data.filter((product: IProduct) =>
    product.name.toLowerCase().includes(value.toLowerCase())
    );
    setInputValue(value)
    setFilteredProducts(filteredProducts);
    setSelectedFilterValue("search")
  };
  
  return (
    <TextField
    className="search-input"
    sx={{ bgcolor: "white", width: "90%"}}
      placeholder="Search"
      value={inputValue}
      type="text"
      variant="outlined"
      onChange={(e) => handleSearchInput(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton>
      
            <SearchOutlined/>
          </IconButton>
        ),
      }}
    />
  );
};
