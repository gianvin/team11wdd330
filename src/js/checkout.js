import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkout-process.mjs";

loadHeaderFooter();
const checkout = new CheckoutProcess("so-cart", "checkout-summary");
checkout.init();
checkout.renderSubtotal();

document
  //.querySelector("form")
  //.addEventListener("submit", checkout.checkout.bind(checkout));
  //document.getElementById("zip").addEventListener("input", () => {
  //checkout.renderTotal();
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  checkout.checkout();
});
