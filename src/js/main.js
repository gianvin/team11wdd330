import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const listEl = document.querySelector(".product-list");
const productData = new ProductData("tents");
const productListing = new ProductListing("tents", productData, listEl);

productListing.init();
