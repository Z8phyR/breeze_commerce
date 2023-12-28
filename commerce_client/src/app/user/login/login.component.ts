import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../api/users.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [UsersService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private usersService: UsersService, private router: Router) { }
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  errorMessage(): any{
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  
  errormessage: boolean = false;
  errorMessages: string[] = [];

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.usersService.login({ email: email || '', password: password || '' }).subscribe(
        token => {
          console.log(token);
          localStorage.setItem('token', token.token);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
