import { Component, NgModule, NgZone, Inject } from '@angular/core';
import { ProductsService } from '../../api/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { NgbdModalConfirm } from '../../components/confirmwindow/confirmwindow.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductDetailsService } from '../../components/product-details/product-details.service';
import { CheckoutModalComponent } from '../../components/checkout-modal/checkout-modal.component';
import { OrdersService } from '../../api/orders.service';


@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbdModalConfirm, FormsModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css',
})
export class ShoppingcartComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: NgbModal,
    private detail: ProductDetailsService,
    private ordersService: OrdersService,
    private ngZone: NgZone
  ) {}

  cartItems: any = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  shipping: number = 0;
  tempQuantity: { [product: number]: number } = {};


  calculateItemPrice(item: any) {
    const price = Number(item.product.price);
    const quantity = Number(item.quantity);
    return (price * quantity).toFixed(2);
  }

  updateTotals() {
    // console.log('updateTotals');
    this.subtotal = 0;
    this.cartItems.forEach((item: any) => {
      this.subtotal += item.product.price * item.quantity;
    });
    // Round to two decimal places
    this.subtotal = parseFloat(this.subtotal.toFixed(2));
    this.shipping = parseFloat((this.cartItems.length * 2.99).toFixed(2));
    this.tax = parseFloat((this.subtotal * 0.1).toFixed(2));
    this.total = parseFloat((this.subtotal + this.tax).toFixed(2));
    // For shipping fee
    this.total = parseFloat((this.total + this.shipping).toFixed(2));
  }

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      this.productsService.getCart(token).subscribe({
        next: (cart) => {
          const productObservables = cart.map((item: any) => {
            this.tempQuantity[item.productId] = item.quantity || 1;
            console.log('tempQuantity', this.tempQuantity);
            return this.productsService
              .getProduct(item.productId)
              .pipe(
                map((product: any) => ({ product, quantity: item.quantity }))
              )
              });
              
          forkJoin(productObservables).subscribe({
            next: (cartItems: any) => {
              this.cartItems = cartItems;
              this.updateTotals();
              this.productsService.updateCartCount(cartItems.length);
            },
            error: (error) => {
              console.log('Error fetching products:', error);
            },
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
  const modalRef = this.modalService.open(NgbdModalConfirm);
  modalRef.componentInstance.title = `Remove from cart?`;
  modalRef.componentInstance.customMessage = `Are you sure you want to remove ${product.product.name} from your cart?`;
  modalRef.result.then(
    () => { 
      product = product.product._id;
      this.productsService.deleteCartItem(product, token).subscribe({
        next: () => {
          // Use NgZone to ensure updates are detected
          this.ngZone.run(() => {
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
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    },
    (reason) => {
      console.log(`Dismissed ${reason}`);
    }
  );
}

  emptyCart() {
    const token = localStorage.getItem('token') || '';
    if (!token || token === '') {
      this.router.navigate(['login']);
    }

    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.title = `Empty Cart?`;
    modalRef.componentInstance.customMessage = `Are you sure you want to empty your cart?`;
    modalRef.result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
        this.productsService.deleteCart(token).subscribe({
          next: () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 1000,
              data: {
                message: 'Cart Emptied',
                icon: 'check_circle',
                color: 'lightgreen',
              },
              panelClass: ['dismiss-snackbar'],
            });
            this.cartItems = [];
            this.productsService.updateCartCount(0);
            this.updateCart();
            this.updateTotals();
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      (reason) => {
        console.log(`Dismissed ${reason}`);
      }
    );
  }


// In ShoppingcartComponent
onCheckout() {
  const totalPrice = this.total;
  const token = localStorage.getItem('token') || '';
  const itemOrderDetails = {
    products: this.cartItems.map((item:any) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
    totalPrice: totalPrice,
    status: 'pending'
  };
  const modalRef = this.modalService.open(CheckoutModalComponent, { size: 'lg' });
  modalRef.result.then((orderDetails) => {
    if (orderDetails) {
      this.ordersService.postOrder(itemOrderDetails, token).subscribe({
        next: () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000,
            data: {
              message: 'Order Placed',
              icon: 'check_circle',
              color: 'lightgreen',
            },
            panelClass: ['dismiss-snackbar'],
          });
          this.productsService.deleteCart(token).subscribe({
            next: () => {
              this.cartItems = [];
              this.updateCart();
              this.productsService.updateCartCount(0);
            }
        });
        },
        error: (error) => {
          console.log(error);
        },
      });
      // console.log('orderDetails', orderDetails);

      this.router.navigate(['checkout', { orderDetails }]);
    }
  });
}

  changeQuantity(item: any, change: number): void {
    this.tempQuantity[item.product._id] += change;
  }

  updateQuantity(product: any) {
    const quantity = this.tempQuantity[product.product._id];
    if (!quantity) {
      return;
    }
    console.log('updateQuantity');
    const token = localStorage.getItem('token');
    const productItem = {
      productId: product.product._id,
      quantity: quantity,
    };
    this.productsService.updateCartItems(productItem, token).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 1000,
          data: {
            message: 'Quantity Updated',
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

  productDetails(product: any) {
    this.detail.openDialog(product);
  }

}
