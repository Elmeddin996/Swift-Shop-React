import React from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { ProductCard } from "../ProductCard";
import { IProduct } from "../../../models";
import "./style.scss";
import { useProductContext } from "../../../hooks";

export const ProductList: React.FC = () => {
  const { filteredProducts } = useProductContext();
  const [activePage, setActivePage] = React.useState<number>(1);
  const startIndex = (activePage - 1) * 12;
  const slicedProducts = filteredProducts?.slice(startIndex, startIndex + 12);

  React.useEffect(() => {
    setActivePage(1);
  }, [filteredProducts]);
  return (
    <Grid container className="product-list">
      {slicedProducts?.map((data: IProduct) => {
        return <ProductCard key={data.id} data={data} />;
      })}
      <Box className="pagination-box">
        <Pagination
          count={Math.ceil(filteredProducts?.length / 12)}
          page={activePage}
          onChange={(e, newPage) => setActivePage(newPage)}
          showFirstButton
          variant="outlined"
          color="primary"
          shape="rounded"
        />
      </Box>
    </Grid>
  );
};
