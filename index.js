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


//"image": {
//            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
//            "mobile": "./assets/images/image-waffle-mobile.jpg",
//            "tablet": "./assets/images/image-waffle-tablet.jpg",
//            "desktop": "./assets/images/image-waffle-desktop.jpg"
//       },
//       "name": "Waffle with Berries",
//       "category": "Waffle",
//       "price": 6.50
//

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
