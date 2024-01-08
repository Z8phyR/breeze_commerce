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
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  shipping: number = 0;

  updateTotals() {
    this.subtotal = 0;
    this.cartItems.forEach((item: any) => {
      this.subtotal += item.product.price * item.quantity;
    });
    //update subtotal to be 00.00 format
    this.subtotal = Math.round(this.subtotal * 100) / 100;
    this.shipping += this.cartItems.length * 2.99;
    //update shipping to be 00.00 format
    this.shipping = Math.round(this.shipping * 100) / 100;

    this.tax = this.subtotal * 0.1;
    //update tax to be 00.00 format and round to 2 decimal placing a 0 if needed
    this.tax = Math.round(this.tax * 100) / 100;
    // round to 2 decimal placing a 0 if needed
    this.total = this.subtotal + this.tax;
    this.total += this.shipping;
    //update total to be 00.00 format
    this.total = Math.round(this.total * 100) / 100;
  }

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
                this.cartItems.push({product: product, quantity: item.quantity})
                if (cart.indexOf(item) === cart.length - 1) {
                  this.updateTotals();}
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
    const token = localStorage.getItem('token') || '';
    if (!token || token === '') {
      this.router.navigate(['/login']);
    }
    product = product.product._id
    this.productsService.deleteCartItem(product, token).subscribe({
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
        this.cartItems = [];
        this.updateCart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  checkOut(): void {
    console.log('checkOut');
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
