import { createSlice } from "@reduxjs/toolkit"

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
    }
})

export const { confirm } = shoppingPhaseSlice.actions;
export default shoppingPhaseSlice.reducer;
