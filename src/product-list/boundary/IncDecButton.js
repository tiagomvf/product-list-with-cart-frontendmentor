
import { html, render } from "lit-html";
import {} from "@reduxjs/toolkit";
import { decrement, increment } from "../../cartSlice";
import { store } from "../../store";

const btTemplace = (amount) => html`
<style>
  @import url('../../../main.css');
</style>
<div id="add-to-cart" 
  class="
   px-3
    border rounded-full border-rose-300 bg-red h-full
    grid grid-cols-3 items-center place-items-center text-rose-50
  ">
    <button  id="decrement" class="size-3 flex justify-self-start justify-around items-center border rounded-full border-rose-50">
      <img class="size-4/5 self-center" src="./images/icon-decrement-quantity.svg"/>
    </button>
    <span class="font-semibold text-sm">${amount}</span>
    <button id="increment" class="size-3 flex justify-self-end justify-around items-center border rounded-full border-rose-50">
      <img class="size-4/5" src="./images/icon-increment-quantity.svg"/>
    </button>
</div>
`

class IncDecButton extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: "open"})
    store.subscribe(() => this.render());
  }

  render(){
    const amount = store.getState().cart.purchaseList.find(x => x.name == this.dataset.name)?.amount | 0;
    render(btTemplace(amount), this.shadowRoot);
  }

  connectedCallback(){
    this.render();
    this.shadowRoot.querySelector('#decrement').addEventListener('click', () => store.dispatch(decrement({name:this.dataset.name})))
    this.shadowRoot.querySelector('#increment').addEventListener('click', () => store.dispatch(increment({name:this.dataset.name})))
  }

}

customElements.define('inc-dec-button', IncDecButton)
export default IncDecButton;