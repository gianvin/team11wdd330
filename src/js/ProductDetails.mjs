import { getLocalStorage, setLocalStorage } from "./utils.mjs";


function productDetailsTemplate(product) {
    let price = ""
    if(product.FinalPrice < product.SuggestedRetailPrice){
      price = `<p class="product-card__price discount">$${product.FinalPrice} <span class="strike">$${product.SuggestedRetailPrice}</span></p>`
    } else {
      price = `<p class="product-card__price">${product.FinalPrice}</p>`
    }
    return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 classs="divider">${product.NameWithoutBrand}</h2>
        <img class="divider" src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        ${price}
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
    </section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
    };
    addToCart() {
        let cart = getLocalStorage("so-cart");
        if (cart === null || !Array.isArray(cart)) cart = [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
    }
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }
}