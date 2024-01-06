import { Routes } from '@angular/router';
import { LoginComponent } from './page/user/login/login.component';
import { RegisterComponent } from './page/user/register/register.component';
import { HomeComponent } from './page/home/home.component';
import { ProfileComponent } from './page/user/profile/profile.component';
import { ProductsComponent } from './page/products/products.component';
import { ShoppingcartComponent } from './page/shoppingcart/shoppingcart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductsComponent },
    { path: 'shoppingcart', component: ShoppingcartComponent },
  // { path: '**', redirectTo: 'home' }
];
