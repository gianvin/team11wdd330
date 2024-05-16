import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor() {
    this.cart = getLocalStorage("so-cart");
    this.subtotalEl = document.getElementById("subtotal");
    this.shippingEl = document.getElementById("shipping");
    this.taxEl = document.getElementById("tax");
    this.totalEl = document.getElementById("total");
  }
  renderSubtotal() {
    this.subtotalEl.innerHTML = `Subtotal: $${this.calculateSubtotal().toFixed(2)}`;
  }
  renderTotal() {
    this.shippingEl.innerHTML = `Shipping Estimate: $${this.calculateShipping()}`;
    this.taxEl.innerHTML = `Tax: $${this.calculateTax().toFixed(2)}`;
    this.totalEl.innerHTML = `Order Total: $${this.calculateTotal().toFixed(2)}`;
  }
  calculateSubtotal() {
    let total = this.cart.reduce(
      (acc, item) => acc + item.FinalPrice * (item.qty || 1),
      0,
    );
    return total;
  }
  calculateShipping() {
    let shipping = this.cart.reduce((acc, item) => {
      if (acc === 0) {
        acc = 10;
        acc += (item.qty - 1) * 2;
      } else {
        acc += item.qty * 2;
      }
      return acc;
    }, 0);

    return shipping;
  }
  calculateTax() {
    return this.calculateSubtotal() * 0.06;
  }
  calculateTotal() {
    return (
      this.calculateSubtotal() + this.calculateShipping() + this.calculateTax()
    );
  }
}
