import { html, render } from "lit-html";
import { add } from "../../cartSlice";
import { store } from "../../store";
import "./IncDecButton";
import "./AddToCartButtom";

/**
 * @param {import("../../..").Product} product 
 * @returns 
 */
function template(product) {return  html`

<div class="grid columns-1">
    <img class="row-span-2 rounded-md" src=${product.image.desktop}/>
    <div class="flex items-center justify-center h-8 relative bottom-4">
    ${ product.amount == 0 ?
      html`<add-to-cart-button class="h-full w-4/5" data-name=${product.name} data-price=${product.price}></add-to-cart-button>`: 
      html`<inc-dec-button class="h-full w-4/5" data-name=${product.name}></inc-dec-button>`}
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
        store.subscribe(() => this.render())
    }

    render() {
      render(template({
        ...this.product,
        amount: (store.getState().cart.purchaseList.find(x => x.name == this.product.name)?.amount || 0)
      }), this);
    }    

    connectedCallback(){
        this.render(template({
          ...this.product,
          amount: (store.getState().cart.purchaseList.find(x => x.name == product.name)?.amount || 0)
        }), this);
    }
}

customElements.define('fm-product-card', ProductCard)
export default ProductCard;