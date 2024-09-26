import { html, render } from "lit-html";
import { store } from "../../store";
import { deleteEntry } from "../../cartSlice";

function template(items, cartCard) {
    return html`
    <div class="bg-rose-50 rounded-lg px-6 py-4">
        <h2 class="text-xl font-bold text-red" id="title">Your Cart (${items.map(({amount}) => amount).reduce((x,y) => x+y, 0)})</h2>

        ${ items?.length == 0 ?
        html`
        <div class="grid justify-items-center">
        <img src="./images/illustration-empty-cart.svg">
        <span class="text-xs font-semibold text-rose-400 items-center place-items-center">Your added items will appear here</span>
        </div>
        ` :
        html`
        <ul class="text-sm py-2 grid grid-cols-1 gap-3">
        ${items.map(({amount, name, price}) => 
            html`
                <li style="display: grid; grid-template-columns: 7fr 1fr" >
                    <span class="font-semibold">${name}</span>
                    <button
                      @click=${ () => {store.dispatch(deleteEntry({name: name}))}}
                      id="delete" type="button" class="row-span-2 self-center place-self-end size-fit p-px
                      border fill-rose-300 border-rose-300 rounded-full
                      hover:fill-rose-900 hover:border-rose-900">
                       <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                       </svg>
                    </button>
                    <div>
                    <span class="font-semibold text-red">x${amount}</span> 
                    <span class="text-rose-500">@ $${price.toFixed(2)}</span>
                    <span class="font-semibold">$${(amount*price).toFixed(2)}</span>
                    </div>
                </li>
            <hr class="text-rose-300">
            `
        )}
        </ul>
        <div class="grid grid-cols-2 text-sm py-3">
            <span>Order total</span>
            <span class="text-xl font-bold self-center place-self-end">$${
                items.map(({amount, price}) => amount*price ).reduce((x,y) => x+y, 0).toFixed(2)
                }
            </span>
        </div>
        <div class="p-3 rounded-md bg-rose-100 text-sm gap-1 justify-center flex flex-row flex-1" >
           <img src="/images/icon-carbon-neutral.svg">
           <span class="place-self-center">
            This is a <strong>carbon-neutral</strong> delivery
           </span>
        </div>
        <div class="py-3">
        <button class="bg-red w-full font-semibold text-rose-50 rounded-full px-3 py-2 capitalize">confirm order</button>
        </div>
        `}
    </div>
        `
}

class CartCard extends HTMLElement {

    constructor() {
        super();
        store.subscribe(() => this.render());
    }

    render(){
        let purchaseList = store.getState().cart.purchaseList;
        render(template([...purchaseList]), this);
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define('fm-cart-card', CartCard);