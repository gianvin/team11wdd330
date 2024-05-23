import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const listEl = document.querySelector(".product-list");
const category = getParam("category");
const dataSource = new ProductData();
const productListing = new ProductListing(category, dataSource, listEl);

productListing.init();
