import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopup } from './product-details.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(public dialog: MatDialog) {}  

    openDialog(product: string): MatDialogRef<DialogPopup> {
      return this.dialog.open(DialogPopup, {
        width: '550px',
        enterAnimationDuration: 300,
        exitAnimationDuration: 300,
        data: { product: product }
      });
    }
  }
