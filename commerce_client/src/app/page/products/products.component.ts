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
  addToCart(product: any) {
    // console.log(product);
    const token = localStorage.getItem('token');
    // get user from login service or something similiar
    this.productsService.addToCart(product, token).subscribe(
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
}
