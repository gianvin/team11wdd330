import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems?.length) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    renderTotal(cartItems);
  } else {
    document.querySelector(".product-list").innerHTML = "Cart is empty";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function renderTotal(cartItems) {
  let total = cartItems.reduce((acc, item) => acc + item.FinalPrice, 0);
  document.querySelector(".cart-footer").classList.remove("hide");
  document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
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
  <span data-id="${item.Id}" class="delete">X</span>
</li>`;

  return newItem;
}

renderCartContents();

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.getAttribute("data-id");
    const cart = getLocalStorage("so-cart");
    const newCart = cart.filter((item) => item.Id !== id);
    setLocalStorage("so-cart", newCart);
    renderCartContents();
  }
});
