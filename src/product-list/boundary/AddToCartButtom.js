
import { html, render } from "lit-html";
import { increment } from "../../cartSlice";
import { store } from "../../store";

const btTemplace = () => html`
<div class="flex justify-center">
<button id="add-to-cart" class="
w-full flex justify-center items-center text-sm font-semibold min-h-8 border rounded-full border-rose-300 bg-rose-50">
    <img src="./images/icon-add-to-cart.svg"/>
    <span>Add to Cart</span>
</button>
<div>

`

class AddToCartButtom extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: "open"});
    store.subscribe(() => this.render());
  }

  render(){
    render(btTemplace(), this.shadowRoot);
  }

  connectedCallback(){
    this.render();
    const {name, price} = this.dataset;
    this.shadowRoot.querySelector('#add-to-cart').addEventListener('click', () => store.dispatch(increment({name, price: Number(price)})))
  }

}

customElements.define('add-to-cart-button', AddToCartButtom)
export default AddToCartButtom;