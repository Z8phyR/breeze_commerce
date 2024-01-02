import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
    return !!localStorage.getItem('token');
  } 
  return false;
}

    get isLoggedIn$() {
      return this.authStatus.asObservable();
    }

    login(token: string): void {
      if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.authStatus.next(true);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }
}
  

}
