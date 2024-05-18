import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const listEl = document.querySelector(".product-list");
const category = getParam("category");

const dataSource = new ExternalServices();
const productListing = new ProductListing(category, dataSource, listEl);

document.querySelector(".top-products").innerHTML = `Top Products: ${category}`;
productListing.init();

loadHeaderFooter();
