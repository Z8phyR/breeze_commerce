import { Component, OnInit, NgModule } from '@angular/core';
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
  providers: [ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { 

  }

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

  addToCart(product: any) {
    console.log(product);
    // add to user's cart
    

  }


}
