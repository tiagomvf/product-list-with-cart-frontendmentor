
import { html, render } from "lit-html";
import { decrement, increment } from "../../cartSlice";
import { store } from "../../store";

const btTemplace = (amount) => html`
<style>

  button {
    all: unset;
  }

  button {
    flex-basis: 100%;
  }

  button:focus, button:hover {
    filter: invert(50%)
  }

  :host {
    display: flex;
    align-content: center;
    padding: 0;
    margin: 0;
    height: 2.50em;
    font-weight: 500;
  }

  :host > .hidden  {
    display: none;
  }

  .add-first {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: solid 1px var(--clr-rose-500);
  }

  :host > div {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    background-color: var(--clr-red);
    color: var(--clr-rose-050);
    border: none;
    border-radius: 100vw;
  }
  :host > div > button:first-child {
    padding-left: 0.85em;
  }

  :host > div > button:last-child {
    text-align: right;
    padding-right: 0.85em;
  }

  </style>
    <div id='has-items'>
      <button class='decrement minus'>-</button>
      <span class='amount'>${amount}</span>
      <button class='increment plus'>+</button>
    </div>
    <button id='no-items' class='increment add-first'>
      <img src="./images/icon-add-to-cart.svg"/>
      Add to Cart
    </button>
`

class AddToCartButtom extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: "open"});
    store.subscribe(() => this.render());
  }

  render(){
    const {amount} = this.dataset;
    render(btTemplace(amount), this.shadowRoot);
    if(Number(amount) > 0) {
      this.shadowRoot.querySelector("#no-items").classList.add('hidden');
      this.shadowRoot.querySelector("#has-items").classList.remove('hidden');
    }else{
      this.shadowRoot.querySelector("#no-items").classList.remove('hidden');
      this.shadowRoot.querySelector("#has-items").classList.add('hidden');
    }
  }

  connectedCallback(){
    this.render();
    const {name} = this.dataset;
    this.shadowRoot.querySelectorAll('.increment').forEach(element =>
      element.addEventListener('click', () => store.dispatch(increment({name}))));
    this.shadowRoot.querySelector('.decrement').addEventListener('click', () => store.dispatch(decrement({name})))
  }

}

customElements.define('add-to-cart-button', AddToCartButtom)
export default AddToCartButtom;