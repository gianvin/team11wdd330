import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

document.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.value.includes("extraImage")) {
    document.querySelector("picture img.divider").src = e.target.src;
  }
});

loadHeaderFooter();
