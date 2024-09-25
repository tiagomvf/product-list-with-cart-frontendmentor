
import { html, render } from "lit-html";
import {} from "@reduxjs/toolkit";
import { decrement, increment } from "../../cartSlice";
import { store } from "../../store";

const btTemplace = (amount) => html`
<div id="add-to-cart" 
  class="
    border rounded-full border-rose-300 bg-red h-full
    flex flex-row justify-around items-center text-rose-50
  ">
    <button id="decrement">
      <img src="./images/icon-decrement-quantity.svg"/>
    </button>
    <span class="font-semibold">${amount}</span>
    <button id="increment">
      <img src="./images/icon-increment-quantity.svg"/>
    </button>
</div>
`

class IncDecButton extends HTMLElement {

  constructor(){
    super();
    store.subscribe(() => this.render());
  }

  render(){
    const amount = store.getState().cart.purchaseList.find(x => x.name == this.dataset.name)?.amount | 0;
    render(btTemplace(amount), this);
  }

  connectedCallback(){
    this.render();
    this.querySelector('#decrement').addEventListener('click', () => store.dispatch(decrement({name:this.dataset.name})))
    this.querySelector('#increment').addEventListener('click', () => store.dispatch(increment({name:this.dataset.name})))
  }

}

customElements.define('inc-dec-button', IncDecButton)
export default IncDecButton;