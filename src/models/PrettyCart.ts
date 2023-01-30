import CartItem from "./CartItem";

export default interface PrettyCart {
  products: Map<number, CartItem>,
  totalPrice: number
}
