import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [FormsModule, 
            MatFormFieldModule, 
            MatIconModule, 
            MatInputModule, 
            MatSelectModule,
            MatRadioModule
          ],
  templateUrl: './checkoutmodal.component.html',
  styleUrl: './checkoutmodal.component.css'
})
export class CheckoutModalComponent {

  email: string = ''; // This is the email address of the user
  firstName: string = '';
  lastName: string = '';

  country: string = '';
  address1: string = '';
  address2: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';

  cardName: string = '';
  cardNumber: string = '';
  expMonth: string = '';
  expYear: string = '';
  cvv: string = '';
  sameAddress: boolean = false;
  saveInfo: boolean = false;
  shipping: string = 'free';
  payment: string = 'credit';
  deliveryMethod: string = 'standard';

  constructor() { }

}
