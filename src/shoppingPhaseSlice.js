import { createAction, createSlice } from "@reduxjs/toolkit"
import { store } from "./store";
import { clearCart } from "./cartSlice";

const initialState = {
    phase: "shopping"
}

export const shoppingPhaseSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        confirm(state) {
            state.phase = "confirmation";
        },
        continueShopping(state) {
            state.phase = "shopping";
        }
    }
})

export const { confirm, continueShopping } = shoppingPhaseSlice.actions;
export default shoppingPhaseSlice.reducer;
