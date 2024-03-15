import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent{
    addressDetails = {
        country: '',
        name: '',
        phone: '',
        address: '',
        code: '',
        town: '',
    };

    constructor(private router: Router) { }

    submitForm(form: any): void {
        if (form.valid) {
            this.router.navigate(['/checkout/payment']);
        }
    }

}