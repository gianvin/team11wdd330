import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();
if (cart.total > 0) {
  document.querySelector(".list-footer").classList.remove("hide");
}
cart.renderCartContents();
