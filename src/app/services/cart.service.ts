import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import Cart from 'src/models/cart';
import CartItem from 'src/models/CartItem';
import LocalCart from 'src/models/LocalCart'
import PrettyCart from 'src/models/PrettyCart';
import Product from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartURL: string = 'https://beef.godbehere.org/api/carts/v2'

  readonly HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

  cartSource = new BehaviorSubject<Cart>({
    user_id: 0,
    products: [],
    totalPrice: 0
  })

  localCartSource = new BehaviorSubject<LocalCart>({
    products: [],
    totalPrice: 0
  })

  cart$ = this.cartSource.asObservable();

  localCart$ = this.localCartSource.asObservable();

  userId: number = 0;

  constructor(private http: HttpClient, private _flashMessagesService: FlashMessagesService) {
    this.userId = parseInt(localStorage.getItem('userId') || '0');
    // this.updateCart();
  }


  updateCart(): void {
    lastValueFrom(this.http.get<Cart>(`${this.cartURL}/${this.userId}`, { headers: this.HEADERS })).then(
      value => {
        this.cartSource.next(value);
      }
    )
  }

  getLocalCart(): LocalCart {
    let cartString = localStorage.getItem('cart');
    let localCart: LocalCart;
    if (cartString != null) {
      localCart = JSON.parse(cartString);
    } else {
      localCart = {
        products: [],
        totalPrice: 0
      }
    }
    return localCart;
  }

  updateLocalCart(): void {
    let localCart = this.getLocalCart();
    this.localCartSource.next(localCart);
  }

  addToLocalCart(product: Product): void {

    if (product.quantity > 0) {
      let localCart: LocalCart = this.getLocalCart();

      localCart.products.push(product);

      // localCart.products.push(product);
      localCart.totalPrice += product.price;
      localStorage.setItem('cart', JSON.stringify(localCart));
      this.updateLocalCart();
      this._flashMessagesService.show("Added to cart", { cssClass: 'alert-success', timeout: 1000 });
    } else {
      this._flashMessagesService.show("Sold out, sorry", { cssClass: 'alert-danger', timeout: 1000 })
    }


  }

  addProduct(prodId: number): void {
    let requestString = `${this.cartURL}/${this.userId}/${prodId}`;

    lastValueFrom(this.http.put(requestString, { headers: this.HEADERS })).then(() => {
      this.updateCart();
    });
  }


  parseCart(): PrettyCart {

    let cart = this.getLocalCart();

    let prettyCart = {
      products: new Map<number, CartItem>(),
      totalPrice: cart.totalPrice
    }

    cart.products.forEach(item => {
      let incItem = prettyCart.products.get(item.product_id);
      if (incItem) {
        incItem.quantity++;
      } else {
        prettyCart.products.set(item.product_id, { product: item, quantity: 1 });
      }
    });

    return prettyCart;

  }

  removeItem(item: Product, qty: number): void {

    let cart: LocalCart = this.getLocalCart();

    let newProducts = new Array<Product>()

    cart.products.forEach(product => {
      if(product.product_id != item.product_id) {
        newProducts.push(product);
      }
    });

    cart.products = newProducts;

    cart.totalPrice -= item.price * qty;

    localStorage.setItem('cart', JSON.stringify(cart));

    this.updateLocalCart();
  }

}
