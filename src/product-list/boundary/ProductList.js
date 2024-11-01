import ProductCard from "./ProductCard";
import {store} from "../../store"
import { html, render } from "lit-html";

function template() {return  html`
<style>
:host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em

}
image {
    object-fit: cover;
    width: 100%;
}
</style>
`;
}

class ProductList extends HTMLElement {

    /**
     * @type {import("../../..").Product[]}
     */
    constructor(){
        super();
        this.attachShadow({mode:"open"});
        store.subscribe(() => this.render()).bind(this);
    }

    connectedCallback(){
        /**
         * @type {Product[]}
         */
        let products = store.getState().catalog;
        products.forEach(item => {
            const pc = new ProductCard();
            pc.product = item;
            this.shadowRoot.appendChild(pc)
        })
    }

    render(){
        render(template(), this.shadowRoot);       
        let products = store.getState().catalog;
        products.forEach(item => {
            const pc = new ProductCard();
            pc.product = item;
            this.shadowRoot.appendChild(pc)
        })
    }
}

customElements.define("fm-product-list", ProductList);
export default ProductList;
