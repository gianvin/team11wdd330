import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list")
const ProductListing = new ProductList("tents", dataSource, element);

ProductListing.init();
