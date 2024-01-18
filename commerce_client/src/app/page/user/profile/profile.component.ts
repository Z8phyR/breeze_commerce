import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UsersService } from '../../../api/users.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OrdersService } from '../../../api/orders.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../api/products.service';
import { of } from 'rxjs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider'
import { ReviewModalService } from '../../../components/review-modal/review-modal.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule, MatExpansionModule, MatDividerModule],
  providers: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    public reviewModalService: ReviewModalService
  ) { }

  userProfile: any = {};
  orders: any = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token') || '';
    
      this.usersService.profile(token).subscribe(
        data => {
          console.log(data);
          this.userProfile = data;
        },
        error => {
          // redirect to login
          this.router.navigate(['login']);
          console.log(error);
        }
      );
        
      this.ordersService.getOrders(token).pipe(
        switchMap(orders => {
          return forkJoin(
            orders.map((order:any) => {
              return forkJoin(
                order.products.map((product:any) =>
                  this.productsService.getProduct(product.productId).pipe(
                    switchMap(productDetails => {
                      product.details = productDetails; // Add product details to each product
                      return of(product);
                    })
                  )
                )
              ).pipe(
                switchMap(productsWithDetails => {
                  order.products = productsWithDetails;
                  return of(order);
                })
              );
            })
          );
        })
      ).subscribe(
        ordersWithDetails => {
          this.orders = ordersWithDetails;
          console.log('Orders with details: ', ordersWithDetails);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  reviewOrder(productId: any) {
    console.log('Review product: ', productId);
    this.reviewModalService.openDialog(productId);

  }

}
