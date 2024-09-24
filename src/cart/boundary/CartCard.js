import { html, render } from "lit-html";

function template(items, cartCard) {
    return html`
    <div class="bg-rose-50 rounded-lg px-6 py-4">
        <h2 class="text-xl font-bold text-red" id="title">Your Cart (${items.map(({amount}) => amount).reduce((x,y)=>x+y)})</h2>
        <ul class="text-sm py-2 grid grid-cols-1 gap-3">
        ${items.map(({amount, product: {name, price}}) => 
            html`
                <li style="display: grid; grid-template-columns: 7fr 1fr" >
                    <span class="font-semibold">${name}</span>
                    <button type="button" class="row-span-2 self-center place-self-end size-fit p-px border fill-rose-900 border-rose-900 rounded-full" value="teste">
                       <img src="./images/icon-remove-item.svg" class="fill-rose-900"/>
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
                items.map(({amount, product: {price}}) => amount*price ).reduce((x,y) => x+y).toFixed(2)
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
    </div>
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
            amount: 4,
            product: {
                name: "Churro",
                price: 3.75
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