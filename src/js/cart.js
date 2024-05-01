import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // Empty Cart Error fixed
  const htmlItems = cartItems?.length
    ? cartItems.map((item) => cartItemTemplate(item))
    : [];

  // query select the product list element
  const productList = document.querySelector(".product-list");

  // Total $ in Cart finished
  if (cartItems?.length) {
    // show hidden cart footer
    document.querySelector(".cart-footer").style.display = "block";

    // query select the p element that will hold the total
    let cartTotal = document.querySelector(".cart-total");

    // calculate total
    let total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);

    // update html of the p
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;

    // update product list
    productList.innerHTML = htmlItems.join("");
  } else {
    // show empty cart message
    productList.innerHTML = "Your cart is empty";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
