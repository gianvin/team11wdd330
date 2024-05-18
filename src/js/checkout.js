import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkout-process.mjs";

loadHeaderFooter();
let checkout = new CheckoutProcess();
checkout.renderSubtotal();

document
  .querySelector("form")
  .addEventListener("submit", checkout.checkout.bind(checkout));
document.getElementById("zip").addEventListener("input", () => {
  checkout.renderTotal();
});
