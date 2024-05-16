import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkout-process.mjs";

loadHeaderFooter();
let checkout = new CheckoutProcess()
checkout.renderSubtotal();

document.getElementById("zip").addEventListener("input", () => {
    checkout.renderTotal();
})