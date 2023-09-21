import React from "react";
import { Input, Typography } from "@mui/material";
import { IProduct } from "../../../models";
import "./style.scss";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useProductContext } from "../../../hooks";

export const PriceFilterRange: React.FC = () => {
  const {
    productList,
    setFilteredProducts,
    selectedFilterValue,
    setSelectedFilterValue,
  } = useProductContext();

  const [minProductPrice, setMinProductPrice] = React.useState<number>(0);
  const [maxProductPrice, setMaxProductPrice] = React.useState<number>(100000);

  const [rangeValue, setRangeValue] = React.useState<number[]>([
    minProductPrice,
    maxProductPrice,
  ]);

  React.useEffect(() => {
    if (selectedFilterValue === "") {
      setRangeValue([minProductPrice, maxProductPrice]);
    }
  }, [selectedFilterValue, minProductPrice, maxProductPrice]);

  React.useEffect(() => {
    const prices = productList?.data.map((product: IProduct) => product.salePrice);
    if (prices?.length > 0) {
      setMinProductPrice(Math.min(...prices));
      setMaxProductPrice(Math.max(...prices));
    }
  }, [productList]);

  const handleRangeChange = (e: Event, newValue: number | number[]) => {
    setRangeValue(newValue as number[]);
    const filteredProducts = productList?.data.filter(
      (product: IProduct) =>
        product.salePrice >= rangeValue[0] && product.salePrice <= rangeValue[1]
    );
    setFilteredProducts(filteredProducts);
    setSelectedFilterValue("Range");
  };

  const handleInputChange = (value: number, minOrMax: boolean) => {
    if (minOrMax && value !== 0) {
      const newArray = [...rangeValue];
      newArray[0] = value;
      setRangeValue(newArray);
    } else {
      const newArray = [...rangeValue];
      newArray[1] = value;
      setRangeValue(newArray);
    }
    setSelectedFilterValue("Input");
  };

  return (
    <div className="range-slider">
      <Typography className="side-bar-label">Filter By Price</Typography>
      <Box sx={{ width: "90%", display: "flex" }}>
        <Input
          type="number"
          sx={{borderTopLeftRadius:50,paddingLeft:2}}
          className="price-filter-input"
          value={rangeValue[0]}
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value);
            handleInputChange(numericValue, true);
          }}
        />
        <Slider
          getAriaLabel={() => "Price range"}
          value={rangeValue}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          sx={{ color: "white", marginRight: 5, marginLeft: 5 }}
          step={10}
          min={minProductPrice}
          max={maxProductPrice}
        />
        <Input
          type="number"
          sx={{borderTopRightRadius:50,paddingLeft:2}}
          className="price-filter-input"
          value={rangeValue[1]}
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value);
            handleInputChange(numericValue, false);
          }}
        />
      </Box>
    </div>
  );
};
