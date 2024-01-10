import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [FormsModule, 
            MatFormFieldModule, 
            MatIconModule, 
            MatInputModule, 
            MatSelectModule,
            MatRadioModule,
          ],
  providers: [NgForm],
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

  constructor(
    public form: NgForm,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('onSubmit');
    this.activeModal.close(form.value);
    const info = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      country: this.country,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zip: this.zip,
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      expMonth: this.expMonth,
      expYear: this.expYear,
      cvv: this.cvv,
      sameAddress: this.sameAddress,
      saveInfo: this.saveInfo,
      shipping: this.shipping,
      payment: this.payment,
      deliveryMethod: this.deliveryMethod
    };
    ;
  }

}
