import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://localhost:3000';
  

  createReview(token: any, productId: any, rating: any, review: any) {
    const header = { 'Authorization': `${token}` }
    return this.http.post<any>(`${this.baseUrl}/reviews/post`, { productId, rating, review }, { headers: header });
  }
}
