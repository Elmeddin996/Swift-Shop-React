import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/userLogined/loginSlice'
import shoppingCartReducer from '../features/shoppingCartCount/shoppingCartSlice'

export const store = configureStore({
  reducer: {
    isLogined:loginReducer,
    cartCount:shoppingCartReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch