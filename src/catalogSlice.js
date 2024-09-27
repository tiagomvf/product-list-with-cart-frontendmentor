import { createSlice } from "@reduxjs/toolkit"

let response = await fetch('./data.json');

/** 
 * @typedef {Object} Catalog
 * @property {Product[]} products
 */


/**
 * @type {Catalog}
 */
const initialState =  await response.json()

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: { }
})

export default catalogSlice.reducer;
