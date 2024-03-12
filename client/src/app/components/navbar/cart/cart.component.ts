import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public cart : any = localStorage.getItem('ESIA_Cart');

  constructor(private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        if(this.cart == null){
            this.cart = [];
        } else{
            this.cart = JSON.parse(this.cart);
        }
        console.log(this.cart)
    }
  
    refresh(): void {
        this.cart = localStorage.getItem('ESIA_Cart');
        if(this.cart == null){
            this.cart = [];
        } else{
            this.cart = JSON.parse(this.cart);
        }
    }

    removeFromCart($event: any, item: any): void {
        $event.stopPropagation();
        let itemToRemove = this.cart.find((x: { id: any; }) => x.id == item.id);
        const index = this.cart.indexOf(itemToRemove);
        if (index > -1) {
            this.cart.splice(index, 1);
            this._snackBar.open(`Removed ${item.title} from your cart`, 'X', {duration: 3000});
        }
        localStorage.setItem('ESIA_Cart', JSON.stringify(this.cart));
    }
}
