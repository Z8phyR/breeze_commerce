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


  profile(token: string): Observable<any> {
    const header = { 'Authorization': `${token}` };
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers: header });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/logout`);
  }

  updateProfile(credentials: { username: string; firstName: string; lastName: string; email: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update-profile`, credentials);
  }

  updatePassword(credentials: { password: string; newPassword: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update-password`, credentials);
  }

  deleteProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/delete-profile`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }

  updateUser(id: string, credentials: { username: string; firstName: string; lastName: string; email: string; }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update/${id}`, credentials);
  }


}
