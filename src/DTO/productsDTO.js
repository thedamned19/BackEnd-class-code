export class ProductsDTO {
    constructor(products) {
        this.title = products.title.toUpperCase();
        this.description = products.description.toUpperCase();
        this.price = products.price;
        this.stock = products.stock;
    }
}