import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './page/home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductsComponent } from './products/products.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent   },
    { path: 'products', component: ProductsComponent },
    // { path: '**', redirectTo: 'home' }
];
