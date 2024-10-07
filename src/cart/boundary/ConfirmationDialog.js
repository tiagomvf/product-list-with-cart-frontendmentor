import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { continueShopping } from "../../shoppingPhaseSlice";
import { store } from "../../store";
import { clearCart } from "../../cartSlice";

const template = `
  <style> @import "../../../main.css"; </style>
  <dialog class="rounded-lg">
  <p class=" text-red bordertext-xl">Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
  </dialog>
`

class ConfirmationDialog extends HTMLElement {

    constructor(){
        super();
        this.root = this.attachShadow({mode: "closed"})
        this.root.innerHTML = template;
        store.subscribe(() => {
          const phase = store.getState().shoppingPhase.phase;
          const dialog = this.root.querySelector("dialog")
          
          if(phase === "confirmation") {
            dialog.showModal();
          } else {
            dialog.close()
          }

          const btn = this.root.querySelector("form button");
          btn.addEventListener("click", () => {
            store.dispatch(continueShopping())
            store.dispatch(clearCart())
          })
        });
    }


}

customElements.define("fm-confirmation-dialog", ConfirmationDialog);
export default ConfirmationDialog;