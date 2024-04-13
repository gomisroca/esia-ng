import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { environment } from 'src/environments/environment';
import { Exhibition } from 'src/models';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent implements OnInit, OnDestroy {
    private exhSub !: Subscription;
    public exhibitions !: Array<Exhibition>;
    public error !: Error;
    public environment = environment;

    constructor(
        public artService: ArtService,
        private _snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.exhSub = this.artService
        .getExhibitions()
        .subscribe({
            next: (itemList: Array<Exhibition>) => {
                this.exhibitions = itemList;
            },
            error: e => this.error = e
        })
    }

    productToCart(item: Exhibition): void {
        let cart : any = localStorage.getItem('ESIA_Cart');

        if(cart == null){
            cart = [];
        } else{
            cart = JSON.parse(cart);
        }
        cart.push(item);
        console.log(cart)
        localStorage.setItem('ESIA_Cart', JSON.stringify(cart));
        this._snackBar.open(`Added ${item.title} to your cart`, 'X', {duration: 3000});
    }

    ngOnDestroy(): void {
        if (this.exhSub){
            this.exhSub.unsubscribe();
        }
    }
}
