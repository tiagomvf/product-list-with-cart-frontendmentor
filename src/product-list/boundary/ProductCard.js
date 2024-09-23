import { html, render } from "lit-html";

/**
 * @param {import("../../..").Product} product 
 * @returns 
 */
function template(product) {return  html`
<div>
    <image src=${product.image.desktop}></image>
    <ul>
        <li>${product.name}</li>
        <li>${product.category}</li>
        <li>${product.price}</li>
    </ul>
    <button>add to cart</button>
</div>
`;
}

class ProductCard extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback(){
        render(template(this.product), this);
    }
}

customElements.define('fm-product-card', ProductCard)
export default ProductCard;