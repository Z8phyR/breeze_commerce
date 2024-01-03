import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  products(): Observable<Product[]> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart/add`, product);
  }

  getCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart`);
  }

  deleteCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/delete`);
  }

  deleteCartItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/cart/delete/${id}`);
  }

  checkout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/checkout`);
  }

  
}
