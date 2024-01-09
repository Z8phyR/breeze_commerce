import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule],  
})
export class DialogPopup {
  constructor(
    public dialogRef: MatDialogRef<DialogPopup>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
  }

  quantity: any = 1;

  // Add to cart
  addToCart(product: any, quantity: number) {
    this.dialogRef.close({ addedToCart: true, product, quantity });
  }
}
