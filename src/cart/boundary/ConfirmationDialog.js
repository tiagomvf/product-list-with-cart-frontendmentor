
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
    }

    showModal(){
      const dialog = this.root.querySelector("dialog")
      dialog.showModal();
    }

}

customElements.define("fm-confirmation-dialog", ConfirmationDialog);
export default ConfirmationDialog;