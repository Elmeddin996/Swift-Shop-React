import React from "react";
import { Slider } from "../components/Slider";
import { MultiCarousel } from "../components/MultiCarousel";
import { useProductContext } from "../../hooks";
import { IProduct } from "../../models";
import './style.scss'

export const Home: React.FC = () => {
  const { productList } = useProductContext();
  
  const discountedProduct: IProduct[] = productList?.data.filter(
    (product:IProduct) => product.discountPercentage > 0
  );
  const appleProduct: IProduct[] = productList?.data.filter(
    (product:IProduct) => product.brand === "Apple"
  );
  const samsungProduct: IProduct[] = productList?.data.filter(
    (product:IProduct) => product.brand === "Samsung"
  );
  return (
    <div className="home-page">
      {/* Main Slider */}
      <Slider />
      {/* Discounted Products Slider */}
      <MultiCarousel discounted={true} products={discountedProduct} color="rgba(252,194,1,1)" />
      {/* Apple Products Slider */}
      <MultiCarousel  products={appleProduct} color="#FFE55C" />
      {/* Samsung Products Slider */}
      <MultiCarousel products={samsungProduct} color="#a07e28" />
    </div>
  );
};
