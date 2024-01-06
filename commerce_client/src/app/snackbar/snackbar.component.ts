import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatIconModule],
  template: `
  <span class="snackbar">
  <span class="snackbar-text">{{data.message}}
  </span>
  <mat-icon style="color: {{data.color}};">{{data.icon}}</mat-icon>
  `,
  styles: [`
    .snackbar {
      // color: #4da648;
      // background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 4px;
    }
      `]
})
export class SnackbarComponent {
  
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
