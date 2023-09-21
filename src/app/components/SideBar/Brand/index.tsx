import React from "react";
import { Button} from "@mui/material";
import { IBrand, IBrandCategoryProps, IProduct } from "../../../../models";
import { useService } from "../../../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../../../enums";

export const Brand: React.FC<IBrandCategoryProps> = ({
  productList,
  setFilteredProducts,
  setSelectedFilterValue,
  selectedFilterValue,
}) => {
  const { brandsService } = useService();
  const { data: brands } = useQuery([EQueryKeys.GET_BRAND_LIST], () =>
    brandsService.getBrandList()
  );

  const filterByBrand = (brandName: string) => {
    setSelectedFilterValue(brandName);
    const result = productList?.filter((curData: IProduct) => {
      return curData.brand.name === brandName;
    });
    setFilteredProducts(result);
  };

  return (
    <div className="brand-container">
      {brands?.data.map((brand: IBrand) => {
        const isSelected = selectedFilterValue === brand.name;
        return (
          <Button
            key={brand.id}
            className={isSelected ? "side-bar-btns-selected" : "side-bar-btns"}
            onClick={() => filterByBrand(brand.name)}
          >
            {brand.name}
          </Button>
        );
      })}
    </div>
  );
};
