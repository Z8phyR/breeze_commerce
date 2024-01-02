import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {  }


  logout() {
      this.authService.logout();
      alert('You have been logged out');  
      this.router.navigate(['/login']);
  }

}   