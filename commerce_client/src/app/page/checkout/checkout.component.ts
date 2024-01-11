import { Component, OnInit, Inject } from '@angular/core';
import { OrdersService } from '../../api/orders.service';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(
    @Inject (PLATFORM_ID) private platformId: Object,
    private ordersService: OrdersService) { }

  orders: any = [];
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    const token = localStorage.getItem('token');
    this.ordersService.getOrders(token).subscribe(
      (orders) => {
        this.orders = orders;
        console.log(orders);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

}
