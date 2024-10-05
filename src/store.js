import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import catalogSlice from './catalogSlice'
import shoppingPhase from './shoppingPhaseSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalog: catalogSlice,
    shoppingPhase: shoppingPhase
  },
})