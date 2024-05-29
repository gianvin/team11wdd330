import ExternalServices from "./ExternalServices.mjs";
import { addAlert, removeAllAlerts, getLocalStorage, setLocalStorage } from "./utils.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    // eslint-disable-next-line no-console
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.qty,
    };
  });
  return simplifiedItems;
}

//function packageItems(formData) {
  //let jsonData = {};
  //formData.forEach((value, key) => {
    //jsonData[key] = value;
  //});
  //jsonData["items"] = this.cart.map((item) => {
    //return {
      //id: item.Id,
      //name: item.Name,
      //price: item.FinalPrice,
      //quantity: item.qty,
    //};
  //});
  //jsonData["orderDate"] = new Date();

  //jsonData["tax"] = this.calculateTax();
  //jsonData["shipping"] = this.calculateShipping();
  //jsonData["total"] = this.calculateTotal();

  //return jsonData;
//}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.subtotalEl = 0;
    this.shippingEl = 0;
    this.taxEl = 0;
    this.totalEl = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateSubtotal();
  }
  //constructor() {
    //this.cart = getLocalStorage("so-cart");
    //this.subtotalEl = document.getElementById("subtotal");
    //this.shippingEl = document.getElementById("shipping");
    //this.taxEl = document.getElementById("tax");
    //this.totalEl = document.getElementById("total");
  //}
  //renderSubtotal() {
    //this.subtotalEl.value = `$${this.calculateSubtotal().toFixed(2)}`;
  //}
  //renderTotal() {
    //this.shippingEl.value = `$${this.calculateShipping()}`;
    //this.taxEl.value = `$${this.calculateTax().toFixed(2)}`;
    //this.totalEl.value = `$${this.calculateTotal().toFixed(2)}`;
  //}
  calculateSubtotal() {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.subtotalEl = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.subtotalEl;
  }
    //let total = this.cart.reduce(
      //(acc, item) => acc + item.FinalPrice * (item.qty || 1),
      //0,
    //);
    //return total;
  //}
  //calculateShipping() {
    //let shipping = this.cart.reduce((acc, item) => {
      //if (acc === 0) {
        //acc = 10;
        //acc += (item.qty - 1) * 2;
      //} else {
        //acc += item.qty * 2;
      //}
      //return acc;
    //}, 0);

    //return shipping;
  //}
  //calculateTax() {
    //return this.calculateSubtotal() * 0.06;
  //}
  //calculateTotal() {
    //return (
      //this.calculateSubtotal() + this.calculateShipping() + this.calculateTax()
    //);
  //}

  calculateOrdertotal() {
    this.shippingEl = 10 + (this.list.length - 1) * 2;
    this.taxEl = (this.subtotalEl * 0.06).toFixed(2);
    this.totalEl = (
      parseFloat(this.subtotalEl) +
      parseFloat(this.shippingEl) +
      parseFloat(this.taxEl)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shippingEl = document.querySelector(this.outputSelector + " #shipping");
    const taxEl = document.querySelector(this.outputSelector + " #tax");
    const totalEl = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shippingEl.innerText = "$" + this.shippingEl;
    taxEl.innerText = "$" + this.taxEl;
    totalEl.innerText = "$" + this.totalEl;
  }

  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.totalEl = this.totalEl;
    json.taxEl = this.taxEl;
    json.shippingEl = this.shippingEl;
    json.items = packageItems(this.list);
    // eslint-disable-next-line no-console
    console.log(json);
    try {
      const res = await services.checkout(json);
      // eslint-disable-next-line no-console
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        addAlert(err.message[message]);
      }

      // eslint-disable-next-line no-console
      console.log(err);

  //async checkout(event) {
    //event.preventDefault();
    //let form = new FormData(event.target);
    //let data = packageItems.bind(this)(form);

    //let chk_status = event.target.checkValidity();
    //event.target.reportValidity();
    //if (chk_status) {
      //ExternalServices.checkout(data).then(async (res) => {
        //if (res.ok) {
          //setLocalStorage("so-cart", []);
          //location.assign("/checkout/success.html");
        //} else {
          //document.getElementById("alerts").innerHTML = ""
          //let err = await res.json();
          //for (const [key, value] of Object.entries(err)) {
            //addAlert(value);
          //}
          //window.scrollTo(0,0)
        //}
      //});
    }
  }
}
