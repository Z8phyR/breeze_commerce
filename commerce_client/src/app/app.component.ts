import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './page/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HttpClientModule
    ],
  template: '<app-navbar></app-navbar><router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'commerce_client';
}
