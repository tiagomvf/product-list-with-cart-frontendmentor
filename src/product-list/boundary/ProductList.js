import { html, render } from "lit-html";
import ProductCard from "./ProductCard";

class ProductList extends HTMLElement {

    /**
     * @type {import("../../..").Product[]}
     */
    constructor(){
        super();
    }

    async connectedCallback(){
        let response = await fetch('./data.json');
        /**
         * @type {Product[]}
         */
        let products = await response.json();
        products.forEach(item => {
            const pc = new ProductCard();
            pc.product = item;
            this.appendChild(pc)
        })
    }
}

customElements.define("fm-product-list", ProductList);
export default ProductList;