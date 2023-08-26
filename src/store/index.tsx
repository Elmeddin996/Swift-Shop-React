import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/userLogined/loginSlice'

export const store = configureStore({
  reducer: {
    isLogined:loginReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch