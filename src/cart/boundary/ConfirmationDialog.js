import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { continueShopping } from "../../shoppingPhaseSlice";
import { store } from "../../store";
import { clearCart } from "../../cartSlice";
import { html, render } from "lit-html";

const template = (list) => html`
  <dialog class="">
  <p class="">Greetings, one and all!</p>
  ${list.map(({name, amount, price}) => html`<li>${amount} ${name}</li>`)}
  <form method="dialog">
    <button>OK</button>
  </form>
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
          })
    }

    render() {
      const purchaseList = store.getState().cart.purchaseList;
      render(template(purchaseList), this.root);
      const phase = store.getState().shoppingPhase.phase;
      const dialog = this.root.querySelector("dialog")

      if (phase === "confirmation") {
        dialog.showModal();
      } else {
        dialog.close()
      }
    }

}

customElements.define("fm-confirmation-dialog", ConfirmationDialog);
export default ConfirmationDialog;
