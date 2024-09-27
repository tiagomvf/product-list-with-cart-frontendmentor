import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import catalogReducer from './catalogSlice'
import catalogSlice from './catalogSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalog: catalogSlice
  },
})