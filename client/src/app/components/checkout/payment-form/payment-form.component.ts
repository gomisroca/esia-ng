import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent{
    public cart : any = localStorage.getItem('ESIA_Cart');
    paymentDetails = {
        holder: '',
        number: '',
        cvv: '',
    };

    constructor(
        public artService: ArtService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) { }

    submitForm(form: any): void {
        if (form.valid) {
            this._snackBar.open(`Your order has been processed.`, 'X', {duration: 10000});
            this.artService.handleOrder(this.cart);
            localStorage.removeItem('ESIA_Cart');
            setTimeout(() => { this.router.navigate(['/']) }, 5000);
        }
    }
}