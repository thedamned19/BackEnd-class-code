export class CartsDTO {
    constructor(cart) {
        this.id = cart._id;
        this.products = cart.products;
    }
}