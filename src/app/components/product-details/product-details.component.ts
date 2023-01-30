import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Product from 'src/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  declare product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {
    let param = this.route.snapshot.paramMap.get('id') || '0';
    let prodId = parseInt(param);
    this.productService.getProduct(prodId).then(product => {
      this.product = product;
    });

  }

  ngOnInit(): void {
  }

  addToCart(product: Product): void {

    this.cartService.addToLocalCart(product);

  }

}
