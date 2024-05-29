import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

const listEl = document.querySelector(".product-list");
const category = getParam("category");

const dataSource = new ExternalServices();
const productListing = new ProductListing(category, dataSource, listEl);

productListing.init();

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const alert = new Alert("alerts.json");
  alert.displayAlerts();
});
