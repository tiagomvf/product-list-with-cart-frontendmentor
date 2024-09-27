import ProductCard from "./ProductCard";
import {store} from "../../store"

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
        let products = store.getState().catalog;
        products.forEach(item => {
            const pc = new ProductCard();
            pc.product = item;
            this.appendChild(pc)
        })
    }
}

customElements.define("fm-product-list", ProductList);
export default ProductList;