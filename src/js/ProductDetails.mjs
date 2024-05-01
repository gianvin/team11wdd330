class Product {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    init() {

        console.log(`product "${this.name}" initialized. `);
    }

    addToCart() {
        console.log(`Adding product with ID "${this.id}" to cart...`);
        this.dataSource.addToCart(this);
    }
    renderProductDetails() {
        const product = this.dataSource.getProductById(this.id);
        if (!product) {
            return `<p>Product no found.</p>`;
        }
        const detailsHtml = `
        <div class="product">
        <h2>${product.name}</h2>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button onclick="addToCart()">Add to Cart</>
        </div>`;

        return detailsHtml;
    }
}
