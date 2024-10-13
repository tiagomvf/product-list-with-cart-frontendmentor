import { createSlice } from "@reduxjs/toolkit"

const initialState = [];

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: { 
        setCatalog(state, { payload }) {
            payload.forEach(element => {
               state.push(element)
            });
        },
    }
})

export const { setCatalog } = catalogSlice.actions;
export default catalogSlice.reducer;
