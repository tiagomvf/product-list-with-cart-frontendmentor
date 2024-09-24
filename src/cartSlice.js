import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    purchaseList: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, { payload: { name, price } }) => {
            let found = state.purchaseList.find(x => x.name == name);
            if (found) {
                found.amount++;
            } else {
                state.purchaseList =
                  [ ...state.purchaseList, { amount: 1, name, price } ]
            }
        }
    }
})

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
