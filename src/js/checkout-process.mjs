import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

function packageItems(formData, cart){
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  jsonData["items"] = cart.map(item => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.qty
    }
  })
  jsonData["orderDate"] = new Date()
  return jsonData
}


export default class CheckoutProcess {
  constructor() {
    this.cart = getLocalStorage("so-cart");
    this.subtotalEl = document.getElementById("subtotal");
    this.shippingEl = document.getElementById("shipping");
    this.taxEl = document.getElementById("tax");
    this.totalEl = document.getElementById("total");
  }
  renderSubtotal() {
    this.subtotalEl.value = `$${this.calculateSubtotal().toFixed(2)}`;
  }
  renderTotal() {
    this.shippingEl.value = `$${this.calculateShipping()}`;
    this.taxEl.value = `$${this.calculateTax().toFixed(2)}`;
    this.totalEl.value = `$${this.calculateTotal().toFixed(2)}`;
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

  async checkout(event){
    event.preventDefault()
    let form = new FormData(event.target)
    let data = packageItems(form, this.cart)
    ExternalServices.checkout(data)
  }
}
