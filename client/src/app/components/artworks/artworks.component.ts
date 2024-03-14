import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { Artwork } from 'src/models';

@Component({
    selector: 'app-artworks',
    templateUrl: './artworks.component.html',
    styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent implements OnInit, OnDestroy {
    private artSub !: Subscription;
    public art !: Array<Artwork>;
    public error !: Error;

    constructor(
        public artService: ArtService,
        private _snackBar: MatSnackBar,
    ) { }

    shuffleArray(array: Array<Artwork>): void {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    ngOnInit(): void {
        this.artSub = this.artService
        .getArtworks()
        .subscribe({
            next: (itemList: Array<Artwork>) => {
                this.art = itemList;
                console.log(itemList)
                this.shuffleArray(this.art);
            },
            error: e => this.error = e
        })
    }

    productToCart(item: Artwork): void {
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
        if (this.artSub){
            this.artSub.unsubscribe();
        }
    }
}
