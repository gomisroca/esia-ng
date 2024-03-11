import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { Artist, Artwork } from 'src/models';

@Component({
    selector: 'app-artist-single',
    templateUrl: './artist-single.component.html',
    styleUrls: ['./artist-single.component.css']
})

export class ArtistSingleComponent implements OnInit, OnDestroy {
    public routeSub !: Subscription;
    public art!: Array<Artwork>;
    public artist!: Artist;

    constructor( 
        private artService: ArtService,
        private activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
            this.artService
            .getArtistsSingle(params['id'])
            .subscribe((itemList: any) => {
                this.art = itemList.art;
                this.artist = itemList.artist;
                console.log(itemList)
            })
        });
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
        if (this.routeSub){
            this.routeSub.unsubscribe();
        }
    }
}