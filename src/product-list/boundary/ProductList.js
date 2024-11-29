import "./ProductCard.js"
import {store} from "../../store"
import { html, render } from "lit-html";

function template(products) {return  html`
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
    ${products.map(x => 
        html`
        <fm-product-card
          data-image-desktop=${x.image.desktop}
          data-name=${x.name}
          data-amount=0
          data-category=${x.category}
          data-price=${x.price}
        ></fm-product-card>`
    )}
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
        let products = store.getState().catalog;
        this.render(products);
    }

    render(){
        let products = store.getState().catalog;
        render(template(products), this.shadowRoot);       
        // const cards = products.map(item => {
        //     const pc = new ProductCard();
        //     pc.product = item;
        //     return pc;
        // });
        // this.shadowRoot.querySelector("section").replaceChildren(...cards);
    }
}

customElements.define("fm-product-list", ProductList);
export default ProductList;
