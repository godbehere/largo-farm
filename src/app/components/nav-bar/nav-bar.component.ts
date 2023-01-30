import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import LocalCart from 'src/models/LocalCart';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  declare cartSub: Subscription;
  declare cart: LocalCart;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSub = this.cartService.localCart$.subscribe(cart => {
      this.cart = cart;
    });
    this.cartService.updateLocalCart();
  }

  logMeIn() {
    lastValueFrom(this.http.post<any>('http://192.168.68.71:5001/api/users/login', new HttpParams().set('email', 'anotherone@gmail.com').set('password','123456'), { headers : new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})}));
  }

}
