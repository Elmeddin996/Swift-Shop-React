import React from "react";
import { Typography } from "@mui/material";
import { IProduct } from "../../../models";
import "./style.scss";

interface IPriceFilter {
  productList: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

interface State {
  minProductPrice: number;
  maxProductPrice: number;
  minInputValue: number;
  maxInputValue: number;
}

type Action =
  | { type: "SET_MIN_PRODUCT_PRICE"; payload: number }
  | { type: "SET_MAX_PRODUCT_PRICE"; payload: number }
  | { type: "SET_MIN_INPUT_VALUE"; payload: number }
  | { type: "SET_MAX_INPUT_VALUE"; payload: number };

const initialState: State = {
  minProductPrice: 1,
  maxProductPrice: 100000,
  minInputValue: 1,
  maxInputValue: 100000,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_MIN_PRODUCT_PRICE":
      return { ...state, minProductPrice: action.payload };
    case "SET_MAX_PRODUCT_PRICE":
      return { ...state, maxProductPrice: action.payload };
    case "SET_MIN_INPUT_VALUE":
      return { ...state, minInputValue: action.payload };
    case "SET_MAX_INPUT_VALUE":
      return { ...state, maxInputValue: action.payload };
    default:
      return state;
  }
};

export const PriceFilterRange: React.FC<IPriceFilter> = ({
  productList,
  setProducts,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const prices = productList?.map((product) => product.price);
    if (prices?.length > 0) {
      dispatch({ type: "SET_MIN_PRODUCT_PRICE", payload: Math.min(...prices) });
      dispatch({ type: "SET_MAX_PRODUCT_PRICE", payload: Math.max(...prices) });
    }
  }, [productList]);

  const handleRangeInput = () => {
    const filteredProducts = productList.filter(
      (product) =>
        product.price >= state.minInputValue &&
        product.price <= state.maxInputValue
    );
    setProducts(filteredProducts);
  };

  return (
    <>
      <Typography className="side-bar-label">Price</Typography>

      <div className="range-slider">
       <input type="number" defaultValue={state.minProductPrice} onChange={(e) => {
            const numericValue = parseFloat(e.target.value);
            dispatch({ type: "SET_MIN_INPUT_VALUE", payload: numericValue })
            handleRangeInput();
            }}/>
        <input
          type="range"
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value);
            dispatch({ type: "SET_MIN_INPUT_VALUE", payload: numericValue });
            handleRangeInput();
          }}
          min={state.minProductPrice}
          max={state.maxProductPrice}
        />
        <input type="number"  defaultValue={state.maxProductPrice} onChange={(e) => {
            const numericValue = parseFloat(e.target.value);
            dispatch({ type: "SET_MIN_INPUT_VALUE", payload: numericValue });
            handleRangeInput();
          }}/>
        <input
          type="range"
          onChange={(e) => {
            const numericValue = parseFloat(e.target.value);
            dispatch({ type: "SET_MAX_INPUT_VALUE", payload: numericValue });
            handleRangeInput();
          }}
          min={state.minProductPrice}
          max={state.maxProductPrice}
        />
      </div>
    </>
  );
};
