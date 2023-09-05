import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartCount: number;
}

const initialState: CartState = {
  cartCount: 0,
};

export const shoppingCartSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    setCount(state,action) {
      state.cartCount =action.payload ;
    }
  },
});

export const {setCount } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
