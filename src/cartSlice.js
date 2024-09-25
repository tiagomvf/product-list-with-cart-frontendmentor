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
        },
        deleteEntry(state, {payload: {name}}){
            state.purchaseList = state.purchaseList.filter(x => x.name != name);
        },
        increment(state, {payload: {name}}){
            let found = state.purchaseList.find(x => x.name == name);
            found.amount++;
        },
        decrement(state, {payload: {name}}){
            let found = state.purchaseList.find(x => x.name == name);
            if(found.amount == 1) {
                state.purchaseList = state.purchaseList.filter(x => x.name != name);
            }else{
                found.amount--;
            }
        }
    }
})

export const { add, deleteEntry, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
