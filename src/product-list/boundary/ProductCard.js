import { html, render } from "lit-html";

/**
 * @param {import("../../..").Product} product 
 * @returns 
 */
function template(product) {return  html`

<div class="grid columns-1">
    <img class="rounded-md" src=${product.image.desktop}/>
    <div class="flex justify-center">
    <button class="w-2/3 max-w-2/3 min-w-fit border rounded-full border-rose-300 bg-rose-50 min-h-8 max-h-fit">
        <div class="flex justify-center text-sm font-semibold">
        <img class="" src="./images/icon-add-to-cart.svg"/>
        Add to Cart
    </div>
    </button>
    </div>
    <span class="text-rose-400 text-sm font-semibold">${product.category}</span>
    <span class="font-semibold" >${product.name}</span>
    <span class="text-red font-semibold">$ ${product.price.toFixed(2)}</span>
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