import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
    <button class="decrement" data-id="${item.Id}">-</button>
    <p class="cart-card__quantity">qty: ${item.qty || 1}</p>
      <button class="increment" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span data-id="${item.Id}" class="delete">X</span>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.totalSelector = ".cart-total";
    this.totalFooterSelector = ".cart-footer";
    this.addEventListener();
  }

  renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    if(cartItems?.length){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      this.showTotal(cartItems);
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    } else {
      document.querySelector(this.parentSelector).innerHTML = "Your Cart is Empty";
      this.hideTotal();
    }
  }
  addEventListener() {
    document
      .querySelector(this.parentSelector)
      .addEventListener("click", (e) => {
        // get product id
        const id = e.target.getAttribute("data-id");

        if (e.target.classList.contains("delete")) {
          // remove product from cart if delete button was clicked
          this.decrementProduct(id, true);
        } else if (e.target.classList.contains("decrement")) {
          // decrement product if decrement button was clicked
          this.decrementProduct(id);
        } else if (e.target.classList.contains("increment")) {
          // increment product if increment button was clicked
          this.incrementProduct(id);
        }
      });
  }
  decrementProduct(id, removeAll = false) {
    // retrieve cart from local storage
    const cart = getLocalStorage("so-cart");

    // find item in cart
    const itemIndex = cart.findIndex((item) => item.Id === id);

    // if item does not exist, exit function
    if (itemIndex < 0) return;

    // it item exists and is > 1, decrement qty
    if (cart[itemIndex].qty > 1 && !removeAll) {
      cart[itemIndex].qty--;
    } else {
      // remove product from cart
      cart.splice(itemIndex, 1);
    }

    //update cart in local storage
    setLocalStorage("so-cart", cart);

    // rerender cart contents
    this.renderCartContents();
  }
  incrementProduct(id) {
    // retrieve cart from local storage
    const cart = getLocalStorage("so-cart");

    // find item in cart
    const itemIndex = cart.findIndex((item) => item.Id === id);

    // if item does not exist, exit function
    if (itemIndex < 0) return;

    // increment qty
    cart[itemIndex].qty++;

    //update cart in local storage
    setLocalStorage("so-cart", cart);

    // rerender cart contents
    this.renderCartContents();
  }

  showTotal(cartItems) {
    if (cartItems?.length) {
      let total = cartItems.reduce(
        (acc, item) => acc + item.FinalPrice * (item.qty || 1),
        0,
      );
      document.querySelector(this.totalFooterSelector).classList.remove("hide");
      document.querySelector(this.totalSelector).innerHTML =
        `Total: $${total.toFixed(2)}`;
    } else {
      this.hideTotal();
    }
  }
  hideTotal() {
    document.querySelector(this.totalFooterSelector).classList.add("hide");
  }
}
