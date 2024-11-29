import './src/product-list/boundary/ProductList.js'
import './src/cart/boundary/CartCard.js'
import './src/store.js'
import { store } from './src/store.js';
import { setCatalog } from './src/catalogSlice.js';


document.addEventListener('DOMContentLoaded', async function() {
    // Your code here
    console.log('DOM fully loaded and parsed');

    let response = await fetch('./data.json');
    const list = await response.json();
    store.dispatch(setCatalog(list));

});


/**
 * @typedef {Object} Product
 * @property {ImagePaths} image
 * @property {string} name
 * @property {string} category
 * @property {number} price
 */

/** 
 * @typedef ImagePaths
 * @property {string} thumbnail
 * @property {string} mobile
 * @property {string} tablet
 * @property {string} desktop
 */
