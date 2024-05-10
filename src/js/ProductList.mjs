import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let price = ""
  if(product.FinalPrice < product.SuggestedRetailPrice){
    price = `<p class="product-card__price discount">$${product.FinalPrice} <span class="strike">$${product.SuggestedRetailPrice}</span></p>`
  } else {
    price = `<p class="product-card__price">${product.FinalPrice}</p>`
  }
  return `<li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of ">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        ${price}
      </a>
    </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }


  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }
}
