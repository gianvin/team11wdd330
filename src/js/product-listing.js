import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const listEl = document.querySelector(".product-list");
const category = getParam("category");

const dataSource = new ProductData();
const productListing = new ProductListing(category, dataSource, listEl);

document.querySelector(".top-products").innerHTML = `Top Products: ${category}`
productListing.init();


