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

  :host {
    display: flex;
    align-content: center;
    padding: 0;
    margin: 0;
    height: 3em;
    font-weight: 500;
    font-size: var(--fs-200);
  }

  :host > .hidden  {
    display: none;
  }

  .add-first {
    display: flex;
    gap: .40em;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: solid 1px var(--clr-rose-500);
    background: white;
  }

  .add-first:hover,
  .add-first:focus {
    color: var(--clr-red);
    border-color: var(--clr-red);
  }

  :host > div {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-items: center;
    padding: 0 1em;
    background-color: var(--clr-red);
    color: var(--clr-rose-050);
    border: none;
    border-radius: 100vw;
  }


  :host div button {
    display: grid;
    align-content: center;
    justify-content: center;
    border: solid 1px;
    justify-self: start;
    border-radius: 50%;
    width: var(--fs-300);
    height: var(--fs-300);
    line-height: var(--fs-300);
  }

  :host div button:hover,
  :host div button:focus {
    background: var(--clr-rose-050);
    color: var(--clr-red);
    border-color: var(--clr-rose-300);
  }

  :host div button:hover img,
  :host div button:focus img {
    filter: brightness(70%)
 } 

  </style>
    <div id='has-items'>
      <button class='decrement minus'>
        <img src="/images/icon-decrement-quantity.svg"/>
      </button>
      <span class='amount'>${amount}</span>
      <button class='increment plus'>
        <img src="/images/icon-increment-quantity.svg"/>
      </button>
    </div>
    <button id='no-items' class='increment add-first'>
      <img src="/images/icon-add-to-cart.svg"/>
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
