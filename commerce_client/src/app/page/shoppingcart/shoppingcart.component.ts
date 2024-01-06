import { Component,NgModule, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../../api/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  cartItems: any = [];

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    
    this.productsService.getCart(token).subscribe({
      next: (cart) => {
        console.log(cart)
        // retrive the product information from the cart by its id and push it into the cartItems array
        cart.forEach((item: any) => {
          this.productsService.getProduct(item.productId).subscribe({
            next: (product) => {
              if (product) {
                console.log('Product found:', product);
                this.cartItems.push(product)
              } else {
                console.log('Product not found, received:', product);
              }
            },
            error: (error) => {
              console.log('Error fetching product:', error);
            },
          });
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

  removeFromCart(product: any) {
    const token = localStorage.getItem('token');
    this.productsService.deleteCartItem(product).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          data: {
            message: 'Removed from Cart',
            icon: 'check_circle',
            color: 'lightgreen',
          },
          panelClass: ['dismiss-snackbar'],
        });
        this.updateCart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // updateQuantity(product: any, quantity: number) {
  //   const token = localStorage.getItem('token');
  //   this.productsService.updateCartItem(product, quantity).subscribe({
  //     next: () => {
  //       this.snackBar.openFromComponent(SnackbarComponent, {
  //         duration: 1000,
  //         data: {
  //           message: 'Quantity Updated',
  //           icon: 'check_circle',
  //           color: 'lightgreen',
  //         },
  //         panelClass: ['dismiss-snackbar'],
  //       });
  //       this.updateCart();
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }
  updateQuantity(product: any, quantity: number) {
    console.log('updateQuantity');

  }

}