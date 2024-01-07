import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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

  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  addToCart(product: any, token: any): Observable<any> {
    const header = { 'Authorization': `${token}` }
    return this.http.post<any>(`${this.baseUrl}/cart/add`, product, {headers: header});
    
  }

  getCart(token: any): Observable<any> {
    const header = { 'Authorization': `${token}` }
    return this.http.get<any>(`${this.baseUrl}/cart`, { headers: header });
  }
  

  deleteCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/delete`);
  }

  deleteCartItem(id: string,token: string): Observable<any> {
    const header = { 'Authorization': `${token}` }
    return this.http.delete<any>(`${this.baseUrl}/cart/delete/${id}`, { headers: header });
  }

  checkout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart/checkout`);
  }

  // Cart Functions
  private cartItemCount = new BehaviorSubject<number>(0);
  
  getItemCartCount() {
    return this.cartItemCount.asObservable();
  }

  updateCartCount(count: number) {
    this.cartItemCount.next(count);
  }
  
  
}
