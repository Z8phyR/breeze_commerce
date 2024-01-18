import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReviewModalComponent } from './review-modal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReviewsService } from '../../api/reviews.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ReviewModalService {

constructor(public dialog: MatDialog,
  private reviewService: ReviewsService,
  private snackBar: MatSnackBar
  ) { }

  rating: any = 0;
  review: any = '';


openDialog(product: any): MatDialogRef<ReviewModalComponent> {
  const dialogData = {
    product: product.details,
    userInput: {
      rating: this.rating,
      reviewText: this.review
    }
  };
  const dialogRef = this.dialog.open(ReviewModalComponent, {
    width: '550px',
    enterAnimationDuration: 300,
    exitAnimationDuration: 300,
    data: dialogData
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (result) {
      this.submitReview(result);
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 1000,
        data: {
          message: 'Review Submitted!',
          icon: 'check_circle',
          color: 'lightgreen',
        },
        panelClass: ['dismiss-snackbar'],
      });
    }
    else {
      console.log('No review submitted');
    }
  });
  return dialogRef;

  }

submitReview(dialogResult: any) {
  const token = localStorage.getItem('token') || '';
  const productId = dialogResult.product._id;
  const rating = dialogResult.userInput.rating;
  const reviewText = dialogResult.userInput.reviewText;

  this.reviewService.createReview(token, productId, rating, reviewText).subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log(error);
    }
  );
}


} 


