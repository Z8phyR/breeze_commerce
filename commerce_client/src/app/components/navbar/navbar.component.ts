import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgZone,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { ProductsService } from '../../api/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule, MatIconModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // cartNum$: Observable<number>;

  cartNum: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    public authService: AuthService,
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {
    this.fetchCartCount();
    this.productsService.getItemCartCount().subscribe({
      next: (count) => {
        // console.log(
        //   'NAVBAR CONSTRUCTOR: Product Service Get Item Count: ',
        //   count
        // );
        this.cartNum = count;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.log('Error in subscription ', error);
      },
    });
  }

  // Fetch the current cart count from the server on load
  fetchCartCount() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      this.productsService.getCart(token).subscribe(
        (cart) => {
          this.productsService.updateCartCount(cart.length);
          this.cartNum = cart.length;
          // console.log('Cart Count: ', cart.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  logout() {
    this.authService.logout();
    this.cartNum = 0;
    this.snackBar
      .openFromComponent(SnackbarComponent, {
        duration: 1500,
        data: {
          message: 'Logout Successful',
          icon: 'waving_hand',
          color: 'lightgreen',
        },
        panelClass: ['dismiss-snackbar'],
      })
      .afterDismissed()
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
      });
  }
}
