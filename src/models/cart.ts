import Product from "./product";

export default interface Cart {
  user_id: number;
  products: Product[];
  totalPrice: number;
}
