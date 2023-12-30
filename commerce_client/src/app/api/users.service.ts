import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  register(credentials: { username: string; firstName: string; lastName: string; email: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, credentials);
  }

}
