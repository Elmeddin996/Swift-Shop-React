import React from "react";
import { useService } from "../../../../APIs/Services";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../../../enums";
import { Button} from "@mui/material";
import { IBrandCategoryProps, ICategory, IProduct } from "../../../../models";
import "../style.scss";


export const Category: React.FC<IBrandCategoryProps> = ({
  productList,
  setFilteredProducts,
  setSelectedFilterValue,
  selectedFilterValue,
}) => {
  const { categoriesService } = useService();
  const { data: categories } = useQuery([EQueryKeys.GET_CATEGORY_LIST], () =>
    categoriesService.getCategoryList()
  );
  const filterByCategory = (categoryName: string) => {
    setSelectedFilterValue(categoryName);
    const result = productList?.filter((curData: IProduct) => {
      return curData.category === categoryName;
    });
    setFilteredProducts(result);
  };

  return (
    <>

      <div className="category-container">
        {categories?.data.map((category: ICategory) => {
          const isSelected = selectedFilterValue === category.name;
          return (
            <Button
              key={category.id}
              className={isSelected ?"side-bar-btns-selected":"side-bar-btns"}
              onClick={() => filterByCategory(category.name)}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
    </>
  );
};
