import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent{
    paymentDetails = {
        name: '',
        address: '',
    };

    constructor() { }

    submitForm(form: any): void {
        if (form.valid) {
            console.log('Form data:', this.paymentDetails);
        }
    }
}