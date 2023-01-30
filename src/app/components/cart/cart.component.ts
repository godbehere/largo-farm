import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import PrettyCart from 'src/models/PrettyCart';
import Product from 'src/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  declare cart: PrettyCart;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.parseCart();
  }

  removeItem(item: Product) {
    let cartItem = this.cart.products.get(item.product_id);
    let qty: number;

    if (cartItem) {
      qty = cartItem.quantity;
    } else {
      qty = 1;
    }

    this.cartService.removeItem(item, qty);
    this.cart = this.cartService.parseCart();
  }

}
