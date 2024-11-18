import { html, render } from "lit-html";
import { store } from "../../store";
import "./AddToCartButtom";

/**
 * @param {import("../../..").Product} product 
 * @returns 
 */
function template(product) {return  html`
<style>
:host {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}
img {
  object-fit: cover;
  width: 100%;
  border-radius: 5%;
}

.category {
  font-size: var(--fs-200);
  color: var(--clr-rose-300);
  font-weight: 600;
}
.name{
  font-size: var(--fs-300);
  color: var(--clr-rose-900);
  font-weight: 600;
}
.price{
  font-size: var(--fs-300);
  color: var(--clr-red);
  font-weight: 600;
}

div .buttom {
  place-self: center;
  translate: 0 -1em;
}

add-to-cart-button {
  width: 65%;
  align-self: center;
  position: relative;
  top: -2.2em;
}
</style>
<div>
  <img src=${product.image.desktop}>
</div>
<add-to-cart-button data-name=${product.name} data-amount=${product.amount}></add-to-cart-button> 
<div class="category">${product.category}</div>
<div class="name">${product.name}</div>
<div class="price">$ ${product.price.toFixed(2)}</div>
`;
}

class ProductCard extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        store.subscribe(() => this.render())
    }

    render() {
      render(template({
        ...this.product,
        amount: (store.getState().cart.purchaseList.find(x => x.name == this.product.name)?.amount || 0)
      }), this.shadowRoot);
    }    

    connectedCallback(){
        this.render();
    }
}

customElements.define('fm-product-card', ProductCard)
export default ProductCard;