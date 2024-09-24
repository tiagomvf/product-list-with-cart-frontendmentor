import { html, render } from "lit-html";

/**
 * @param {import("../../..").Product} product 
 * @returns 
 */
function template(product) {return  html`

<div class="grid columns-1">
    <img class="row-span-2 rounded-md" src=${product.image.desktop}/>
    <div class="flex justify-center h-7">
    <button class="relative bottom-4 w-2/3 max-w-2/3 min-w-fit border rounded-full border-rose-300 bg-rose-50 min-h-8">
      <div class="flex justify-center text-sm font-semibold">
        <img class="" src="./images/icon-add-to-cart.svg"/>
        <span>Add to Cart</span>
      </div>
    </button>
    </div>
    <div class="grid grid-cols-1">
    <span class="text-rose-400 text-sm font-semibold">${product.category}</span>
    <span class="font-semibold" >${product.name}</span>
    <span class="text-red font-semibold">$ ${product.price.toFixed(2)}</span>
    <div>
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