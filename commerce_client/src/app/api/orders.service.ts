import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  postOrder(order: any, token: any): Observable<any> {
    const header = { 'Authorization': `${token}` }
    console.log('postOrder');
    return this.http.post<any>(`${this.baseUrl}/orders/post`, order, { headers: header });
  }

}
