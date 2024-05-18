import ExternalServices from "./ExternalServices.mjs";
import { addAlert, getLocalStorage, setLocalStorage } from "./utils.mjs";

function packageItems(formData) {
  let jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });
  jsonData["items"] = this.cart.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.qty,
    };
  });
  jsonData["orderDate"] = new Date();

  jsonData["tax"] = this.calculateTax();
  jsonData["shipping"] = this.calculateShipping();
  jsonData["total"] = this.calculateTotal();

  return jsonData;
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

  async checkout(event) {
    event.preventDefault();
    let form = new FormData(event.target);
    let data = packageItems.bind(this)(form);

    let chk_status = event.target.checkValidity();
    event.target.reportValidity();
    if (chk_status) {
      ExternalServices.checkout(data).then(async (res) => {
        if (res.ok) {
          setLocalStorage("so-cart", []);
          location.assign("/checkout/success.html");
        } else {
          document.getElementById("alerts").innerHTML = ""
          let err = await res.json();
          for (const [key, value] of Object.entries(err)) {
            addAlert(value);
          }
          window.scrollTo(0,0)
        }
      });
    }
  }
}
