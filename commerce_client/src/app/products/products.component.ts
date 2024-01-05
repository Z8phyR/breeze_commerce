import { Component, OnInit, NgModule, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../api/products.service';
import { CommonModule } from '@angular/common';

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
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private ngZone: NgZone
    ) {}
  
  products:Product[] = [];

  ngOnInit() {
    this.productsService.products().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log(error);
      }
    );
  }

  // add to user's cart
  addToCart(product: any) {
    // console.log(product);
    const token = localStorage.getItem('token');
    // get user from login service or something similiar
    this.productsService.addToCart(product,token).subscribe(
      res => {
        this.ngZone.run(() => {
          this.productsService.updateCartCount(res.cart.length);
          console.log("(PRODUCT COMPONENT): Cart Count: ", res.cart.length);
        });
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

}
