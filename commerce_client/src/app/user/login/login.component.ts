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
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  errorMessage(): any{
    if (this.loginForm.controls.username.hasError('required')) {
      return 'You must enter a value';
    }
  }
  
  
  errormessage: boolean = false;
  errorMessages: string[] = [];

  onSubmit() {
    if (this.loginForm.valid) {
      // const { username, password } = this.loginForm.value;
      // obtain username and password and convert username to lower case
      const username = this.loginForm.value.username?.toLowerCase();
      const password = this.loginForm.value.password;


      this.usersService.login({ username: username || '', password: password || '' }).subscribe(
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
