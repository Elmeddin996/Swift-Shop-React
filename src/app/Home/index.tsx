import React from "react";
import { Slider } from "../components/Slider";
import { MultiCarousel } from "../components/MultiCarousel";
import { useProductContext } from "../../hooks";
import { IProduct } from "../../models";
import './style.scss'


export const Home: React.FC = () => {
  const { productList } = useProductContext();

  const appleProduct: IProduct[] = productList?.data.filter(
    (product: any | IProduct) => product.brand === "Apple"
  );
  const samsungProduct: IProduct[] = productList?.data.filter(
    (product: any | IProduct) => product.brand === "Samsung"
  );
  return (
    <div className="home-page">
      {/* Main Slider */}
      <Slider />
      {/* Apple Products Slider */}
      <MultiCarousel  products={appleProduct} color="rgba(252,194,1,1)" />
      {/* Samsung Products Slider */}
      <MultiCarousel products={samsungProduct} color="#FFE55C" />
    </div>
  );
};
