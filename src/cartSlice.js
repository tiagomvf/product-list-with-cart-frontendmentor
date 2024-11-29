import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    purchaseList: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        deleteEntry(state, { payload: { name } }) {
            state.purchaseList = state.purchaseList.filter(x => x.name != name);
        },
        increment(state, { payload: { name } }) {
            let found = state.purchaseList.find(x => x.name == name);
            if (found) {
                found.amount++;
            } else {
                state.purchaseList =
                    [...state.purchaseList, { amount: 1, name }]
            }
        },
        decrement(state, { payload: { name } }) {
            let found = state.purchaseList.find(x => x.name == name);
            if (found.amount == 1) {
                state.purchaseList = state.purchaseList.filter(x => x.name != name);
            } else {
                found.amount--;
            }
        },
        clearCart(state) {
            state.purchaseList = [];
        }
    }
})

export const { deleteEntry, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
