import { Component, } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../api/users.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../api/auth.service';
import { Auth } from 'mongodb';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [UsersService, AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private usersService: UsersService, private router: Router, private authService: AuthService) { }
  
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username?.toLowerCase();
      const password = this.loginForm.value.password;

      this.usersService.login({ username: username || '', password: password || '' }).subscribe(
        token => {
          this.authService.login(token.token);
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
