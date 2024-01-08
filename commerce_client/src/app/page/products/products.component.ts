import { Component, OnInit, NgModule, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../api/products.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}

  products: Product[] = [];
  ngOnInit() {
    this.productsService.products().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // add to user's cart
  addToCart(product: any, quantity: number) {
    // console.log(product);
    const token = localStorage.getItem('token');
    const cartItem = {
      productId: product._id,
      quantity: quantity,
    };
    
    // Retrieve the current cart first
    this.productsService.getCart(token).subscribe(
      (cart) => {
        // If the cart is empty, add the item to the cart
        if (cart.length === 0) {
          console.log('Cart is empty, adding item');
          this.saveToCart(cartItem, token);
        } else {
          // If the cart is not empty, check if the item is already in the cart
          let itemFound = false;
          cart.forEach((item: any) => {
            if (item.productId === cartItem.productId) {
              itemFound = true;
              // If the item is already in the cart, update the quantity
              const newQuantity = item.quantity + cartItem.quantity;
              const updatedCartItem = {
                productId: item.productId,
                quantity: newQuantity,
              };
              this.updateCartCount(updatedCartItem, token);
              console.log('Item already in cart, updated quantity');
            }
          });
          // If the item is not in the cart, add it to the cart
          if (!itemFound) {
            console.log('Item not in cart, adding item');
            this.saveToCart(cartItem, token);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
    saveToCart(cartItem: any, token: any) {
    this.productsService.addToCart(cartItem, token).subscribe(
      (res) => {
        this.ngZone.run(() => {
          this.productsService.updateCartCount(res.cart.length);
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000,
            data: {
              message: 'Added to Cart',
              icon: 'check_circle',
              color: 'lightgreen',
            },
            panelClass: ['dismiss-snackbar'],
          });
          console.log('(PRODUCT COMPONENT): Cart Count: ', res.cart.length);
        });
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCartCount(cartItem: any, token: any) {
    this.productsService.updateCartItems(cartItem, token).subscribe(
      (res) => {
        this.ngZone.run(() => {
          this.productsService.updateCartCount(res.cart.length);
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000,
            data: {
              message: 'Updated Cart Amount',
              icon: 'check_circle',
              color: 'lightgreen',
            },
            panelClass: ['dismiss-snackbar'],
          });
          console.log('(PRODUCT COMPONENT): Cart Count: ', res.cart.length);
        });
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
