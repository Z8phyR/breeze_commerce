import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UsersService } from '../../../api/users.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  providers: [UsersService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  constructor(
    private usersService: UsersService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  userProfile: any = {};


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token') || '';
    
    this.usersService.profile(token).subscribe(
      data => {
        console.log(data);
        this.userProfile = data;
      },
      error => {
        // redirect to login
        this.router.navigate(['/login']);
  
        console.log(error);
      }
    );
  }
}
}
