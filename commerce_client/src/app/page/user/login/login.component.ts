import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../api/users.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../api/auth.service';
import { NgZone } from '@angular/core';
import { ProductsService } from '../../../api/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  afterLogin(token: any) {
    this.snackBar
      .openFromComponent(SnackbarComponent, {
        duration: 1000,
        data: {
          message: 'Login Successful',
          icon: 'check_circle',
          color: 'lightgreen',
        },
        panelClass: ['dismiss-snackbar'],
      })
      .afterDismissed()
      .subscribe({
        next: () => {
          this.productsService.getCart(token.token).subscribe({
            next: (cart) => {
              this.productsService.updateCartCount(cart.length);
              // console.log(" (LOGIN) Cart Count: ", cart.length);
            },
            error: (error) => {
              console.log(error);
            },
          });
          this.router.navigate(['/home']);
        },
      });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username?.toLowerCase();
      const password = this.loginForm.value.password;
      this.ngZone.run(() => {
        this.usersService
          .login({ username: username || '', password: password || '' })
          .subscribe({
            next: (token) => {
              this.authService.login(token.token);
              this.afterLogin(token);
            },
            error: (error) => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                duration: 1000,
                data: {
                  message: 'Login Failed',
                  icon: 'error',
                  color: 'lightpink',
                },
                panelClass: ['dismiss-snackbar'],
              });
              // clear the form
              this.loginForm.reset();
              // console.log(error);
            },
          });
      });
    }
  }
}
