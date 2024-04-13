import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
    public cart : any = localStorage.getItem('ESIA_Cart');
    public environment = environment

    constructor(private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        if(this.cart == null){
            this.cart = [];
        } else{
            this.cart = JSON.parse(this.cart);
        }
        console.log(this.cart)
    }

    removeFromCart(item: any): void {
        let itemToRemove = this.cart.find((x: { id: any; }) => x.id == item.id);
        const index = this.cart.indexOf(itemToRemove);
        if (index > -1) {
            this.cart.splice(index, 1);
            this._snackBar.open(`Removed ${item.title} from your cart`, 'X', {duration: 3000});
        }
        localStorage.setItem('ESIA_Cart', JSON.stringify(this.cart));
    }
}