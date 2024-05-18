import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listEl = document.querySelector(".product-list");
const externalServices = new ExternalServices("tents");
const productListing = new ProductListing("tents", externalServices, listEl);

productListing.init();

loadHeaderFooter();
