import { html, render } from "lit-html";

function template(items, cartCard) {
    return html`
    <div class="bg-rose-50 rounded-md">
        <h2 class="text-xl font-bold text-red" id="title">Your Cart (${items.map(({amount}) => amount).reduce((x,y)=>x+y)})</h2>
        ${items.map(({amount, product: {name, price}}) => 
            html`
            <ul class="text-sm">
                <li 
                style="display: grid; grid-template-columns: 7fr 1fr"
                >
                    <span class="font-semibold">${name}</span>
                    <button type="button" class="row-span-2 self-center size-fit p-px border border-s-rose-300 border-rose-300 rounded-full" value="teste">
                        <img src="../../assets/images/icon-remove-item.svg">
                    </button>
                    <div>
                    <span class="font-semibold text-red">x${amount}</span> 
                    <span class="text-rose-500">@ $${price.toFixed(2)}</span>
                    <span class="font-semibold">$${(amount*price).toFixed(2)}</span>
                    </div>
                </li>
            </ul>
            <hr class="text-rose-100">
            `
        )}
        <div class="text-sm">
            <span>Order total</span>
            <span class="text-xl font-bold">$${
                items.map(({amount, product: {price}}) => amount*price ).reduce((x,y) => x+y).toFixed(2)
                }
            </span>
        </div>
        <div class="rounded-md bg-rose-100 text-sm" >This is a <strong>carbon-neutral</strong> delivery</div>
        <button class="bg-red text-rose-50 rounded-full px-3 py-1" >Confirm order</button>
        `
      

}

class CartCard extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        let purchaseList = [
        {
            amount: 2,
            product: {
                name: "Bolo de Rolo",
                price: 13.5
            }
        },
        {
            amount: 1,
            product: {
                name: "Tapioca",
                price: 10
            }
        }
        ]
        render(template(purchaseList), this);
    }
}

customElements.define('fm-cart-card', CartCard);