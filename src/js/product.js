import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //> Get previous cart contents from localstorage
  let cartContents = getLocalStorage("so-cart");

  //> Check if cartContens is not null
  if (cartContents) {
    if (cartContents instanceof Array) {
      //> If cartContents is an Array, add previous and new contents to localstorage
      setLocalStorage("so-cart", [...cartContents, product]);
    } else {
      //> If cartContents is an object, add the previous object and new object to an array
      setLocalStorage("so-cart", [cartContents, product]);
    }
  } else {
    //> If cartContents is null, just add the new product to localstorage
    setLocalStorage("so-cart", [product]);
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
