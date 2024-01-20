import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [UsersService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private usersService: UsersService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  errorMessage(): any {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
  }

  errormessage: boolean = false;
  errorMessages: string[] = [];

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, firstName, lastName, email, password } =
        this.registerForm.value;
      this.usersService
        .register({
          username: username || '',
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          password: password || '',
        })
        .subscribe(
          (data) => {
            console.log(data);
            // confirm to the user that they have registered
            confirm('You have registered successfully');
            this.router.navigate(['login']);
          },
          (error) => {
            this.errormessage = true;
            this.errorMessages = error.error.message;
            // show the error to the user

            console.log(error);
          }
        );
    }
  }
}
