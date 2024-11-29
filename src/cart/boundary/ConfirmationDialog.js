import { continueShopping } from "../../shoppingPhaseSlice";
import { store } from "../../store";
import { clearCart } from "../../cartSlice";
import { html, render } from "lit-html";

const template = (list) => html`
  <style>
    :host {
      color: var(--clr-rose-900);
      font-family: redhat, sans-serif;
    }

    h3 {
      font-size: var(--fs-800);
      padding: 0;
      margin: 0;
    }
    
    dialog {
      font-family: redhat, sans-serif;
      padding: 1em;
      border: none;
      border-radius: 10px;
      min-width: 24em;
    }

    dialog > div {
      color: var(--clr-rose-900);
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    dialog > div > img {
      margin-left: 0;
      align-self: start;
      height: 2em;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1.5em;
      margin: 0;
      padding: 0;
    }

    li {
      height: 3em;
      display: grid;
      gap: 1em;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: 1fr 1fr;
      list-style-type:none;
    }

    li > img {
      grid-row: 1/3;
      grid-column: 1;
      object-fit: cover;
      height: 3em;
      aspect-ratio: 1;
      border-radius: .5em;
    }

    li > span:last-child {
      grid-row: 1/3;
      grid-column: 3;
      align-content: center;
      font-size: var(--fs-200);
      font-weight: 600;
    }

    li > span:nth-of-type(1) {
      align-content: start;
      font-size: var(--fs-200);
      font-weight: 600;
    }

    div.total {
      height: 3em;
      display: flex;
      justify-content: space-between;
      align-items: end;
    }

    div.total > span:first-child  {
      font-size: var(--fs-200);
    }

    div.total > span:last-child  {
      font-weight: 700;
      font-size: var(--fs-700);
    }

    li > div > span {
      align-content: end;
    }

    li > div > span:first-child {
      font-weight: 600;
      color: var(--clr-red);
      padding-right: .7em;
    }
    li > div > span:last-child {
      color: var(--clr-rose-500);
    }

    summary {
      color: var(--clr-rose-500);
      font-size: var(--fs-200);
    }

    div.items {
      background-color: var(--clr-rose-100);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding: 1em 1em;
    }

    form {
      display: flex;
    }

    button {
      background-color: var(--clr-red);
      border-radius: 9999px;
      border: none;
      color: var(--clr-rose-050);
      font-size: var(--fs-300);
      font-family: inherit;
      font-weight: 600;
      padding: 1em;
      align-content: center;
      width: 100%;
    }
  </style>

  <dialog>
    <div>
    <img src="/images/icon-order-confirmed.svg">
    <h3>Order Confirmed</h3>
    <summary>We hope you enjoy your food</summary>
    <div class="items">
      <ul>
        ${list.map(({name, amount, price, lineTotal, image}) =>
          html`<li>
            <img src=${image}>
            <span>${name}</span>
            <div>
              <span>${amount}x</span>
              <span>@ $${price}</span>
            </div>
            <span>$${lineTotal}</span>
        </li>`
        )}
      </ul>
        <div class="total">
          <span>Order Total</span>
          <span>$${list.map(x => Number(x.lineTotal)).reduce((x,y) => x+y, 0)}</span>
        </div>
      </div>
    <form method="dialog">
      <button>Start New Order</button>
    </form>
  <div>
  </dialog>
`

class ConfirmationDialog extends HTMLElement {

    constructor(){
        super();
        this.root = this.attachShadow({mode: "closed"})
        store.subscribe(() => this.render());
    }

    connectedCallback(){
        this.render();
        const btn = this.root.querySelector("form button");
          btn.addEventListener("click", () => {
            store.dispatch(continueShopping())
            store.dispatch(clearCart())
          });
    }

    render() {
      const purchaseList = store.getState().cart.purchaseList;
      const catalog = store.getState().catalog;
      const purchaseListWithPrice = 
        purchaseList.map(element => {
          const found = catalog.find( item => element.name == item.name);
          const price = found.price.toFixed(2);
          const image = found.image.thumbnail;
          console.log(JSON.stringify(found));
          return {...element, price, lineTotal: (price * element.amount).toFixed(2), image};
        });
      render(template(purchaseListWithPrice), this.root);
      const phase = store.getState().shoppingPhase.phase;
      const dialog = this.root.querySelector("dialog");
      console.log(`phase: ${phase}`);
      dialog.close();
      if (phase === "confirmation") {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }

}

customElements.define("fm-confirmation-dialog", ConfirmationDialog);
export default ConfirmationDialog;
