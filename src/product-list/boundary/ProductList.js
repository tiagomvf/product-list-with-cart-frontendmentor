import { html, render } from "lit-html";
import ProductCard from "./ProductCard";

//const template = (/** @type{import("../../..").Product[]} */ products) => 
//    html`
//        ${products.map((item) => {
//            return html`
//            <div>
//                <ul>
//                    <li>${item.name}</li>
//                    <li>${item.category}</li>
//                    <li>${item.price}</li>
//                </ul>
//                <button>add to chart</button>
//            </div>`
//        })}
//        `

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