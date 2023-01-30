import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import Product from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL: string = 'https://beef.godbehere.org/api/products';

  readonly HEADERS = new HttpHeaders({'Content-Type': 'application/json', 'Access-control-allow-origin': '*'})

  productSource = new BehaviorSubject<Product[]>([]);

  product$ = this.productSource.asObservable();

  constructor(private http: HttpClient) {
    this.updateProducts();
  }

  updateProducts(){
    lastValueFrom(this.http.get<Product[]>(`${this.productURL}`)).then(products => {
      this.productSource.next(products);
    });
  }

  getProduct(prodId: number): Promise<Product> {
    return lastValueFrom(this.http.get<Product>(`${this.productURL}/${prodId}`));
  }

  productsByCategory(category: string) {
    lastValueFrom(this.http.get<Product[]>(`${this.productURL}/${category}`)).then(products => {
      this.productSource.next(products);
    });
  }

}
