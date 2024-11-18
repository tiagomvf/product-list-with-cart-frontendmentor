import { html, render } from "lit-html";
import { store } from "../../store";
import { deleteEntry } from "../../cartSlice";
import './ConfirmationDialog.js'
import { confirm } from "../../shoppingPhaseSlice.js";

function template(items) {
    return html`
    <style>
        :host {
            background-color: white;
            align-self: start;
            border-radius: .5em;
            padding: 1em;
        }
        h2 {
            color: var(--clr-red);
        }

        :host > div {
          display: flex;
          flex-direction: column;
          gap: 1em ;
        }
        ul[role='list'] {
            list-style: none;
            padding: 0;
        }

        li {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: .25em;
        }

        .button-remove {
            padding: 0;
            grid-row-start: 1;
            grid-row-end: 3;
            grid-column-start: 2;
            align-self: center;
            border: none;
            background-color: transparent;
        }

        svg {
            padding: .1em;
            border: solid 2px;
            border-radius: 50%;
        }
        .name {
            font-size: var(--fs-200);
            line-height: 2;
            font-weight: 600;
        }

        .unit-price, .total-price {
            padding-left: .5em;
        }

        .amount {
            font-weight: 700;
            color: var(--clr-red);
        }

        .unit-price {
            color: var(--clr-rose-300);
        }

        .total-price {
            font-weight: 700;
            color: var(--clr-rose-500);
        }

        .total-order-line {
            display: flex;
            justify-content: space-between;
            align-content: baseline;
            align-items: center;
        }

        .total-order-price {
            font-weight: 700;
            font-size: var(--fs-700);
        }

        .carbon-neutral-msg {
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 1.25em;
            background-color: var(--clr-rose-050);
            border-radius: 0.5em;
        }

        :host > div > button {
            border-radius: 9999px;
            color: var(--clr-rose-050);
            font-weight: 600;
            border: none;
            background-color: var(--clr-red);
            padding: 1em;
        }

        :host > div > button:hover,
        :host > div > button:focus {
            filter: brightness(75%);
        }

        hr {
            color: var(--clr-rose-100);
            border: solid 1px;
        }

        .empty-cart {
            align-items: center;
            font-weight: 600;
            color: var(--clr-rose-400)
        }
    </style>
        <h2>Your Cart (${items.map(({amount}) => amount).reduce((x,y) => x+y, 0)})</h2>
        ${ items?.length == 0 ?
        html`
        <div class="empty-cart">
          <img src="./images/illustration-empty-cart.svg">
          <span>Your added items will appear here</span>
        </div>
        ` :
        html`
        <div>
        <ul role="list">
        ${items.map(({amount, name, price}) => 
            html`
                <li>
                    <span class='name'>${name}</span>
                    <div>
                        <span class="amount">${amount}x</span> 
                        <span class="unit-price">@ $${price.toFixed(2)}</span>
                        <span class="total-price">$${(amount*price).toFixed(2)}</span>
                    </div>
                    <button class='button-remove'
                      @click=${ () => {store.dispatch(deleteEntry({name: name}))}}
                      id="delete" type="button" >
                       <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                       </svg>
                    </button>
                </li>
            <hr>
            `
        )}
        </ul>
        <div class='total-order-line'>
            Order total
            <span class="total-order-price">$${
                items.map(({amount, price}) => amount*price ).reduce((x,y) => x+y, 0).toFixed(2)
                }
            </span>
        </div>
        <div class="carbon-neutral-msg">
           <img src="/images/icon-carbon-neutral.svg">
           <span>
            This is a <strong>carbon-neutral</strong> delivery
           </span>
        </div>
        <button @click=${() => store.dispatch(confirm())} id="confirm-order">Confirm Order</button>
        </div>
        `}
    </div>
<fm-confirmation-dialog></fm-confirmation-dialog>
`
}

class CartCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:"open"});
        store.subscribe(() => this.render());
    }

    render(){
        let purchaseList = store.getState().cart.purchaseList;
        let items = [...purchaseList].map( ({name, amount}) => ({
            name, amount,
            price: [...store.getState().catalog].find(x => x.name == name).price
          }  
        ));
        render(template(items), this.shadowRoot);
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('fm-cart-card', CartCard);
