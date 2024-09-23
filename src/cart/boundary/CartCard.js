import { html, render } from "lit-html";

function template(items, cartCard) {
    return html`
        <div id="title">Your Cart (${items.map(({amount}) => amount).reduce((x,y)=>x+y)})</div>
        ${items.map(({amount, product: {name, price}}) => 
            html`
            <div>
            <div>${name}</div>
            <div>
               x${amount} @${price}  ${amount*price}  
            </div>
            </div>
            <div>
                <button>x</button>
            `
        )}
        <div>
            Order total ${
                items.map(({amount, product: {price}}) => amount*price ).reduce((x,y) => x+y)
                }
        </div>
        <div>This is a carbon neutral delivery</div>
        <button>Confirm order</button>
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