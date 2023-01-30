import Product from "./product";

export default interface LocalCart {
  products: Array<Product>,
  totalPrice: number
}
