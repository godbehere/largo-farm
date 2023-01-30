import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Product from 'src/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  productMap: Map<number, Product> = new Map();

  myCart: Array<Product> = [];

  declare productSubscription: Subscription;

  filter = 'all';

  constructor(private productService: ProductService, private cartService: CartService) {
    let existingCart = localStorage.getItem('cart');

    if(existingCart) {
      this.myCart.push = JSON.parse(existingCart)
    }
  }

  ngOnInit(): void {
    this.productService.updateProducts();
    this.productSubscription = this.productService.product$.subscribe(products => {
      this.products = products;
    })
    this.cartService.updateLocalCart();
  }

  addToCart(product: Product): void {

    this.cartService.addToLocalCart(product);

  }

  categoryFilter(category: string): void {
    this.filter = category;

    if (category === 'all') {
      this.productService.updateProducts();
    } else {
      this.productService.productsByCategory(category);
    }

  }

}
