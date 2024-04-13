import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { environment } from 'src/environments/environment';
import { Artwork } from 'src/models';

@Component({
    selector: 'app-artwork-single',
    templateUrl: './artwork-single.component.html',
    styleUrls: ['./artwork-single.component.css']
})

export class ArtworkSingleComponent implements OnInit, OnDestroy {
    private artSub !: Subscription;
    public art !: Artwork;
    public error !: Error;
    public environment = environment

    constructor(
        public artService: ArtService,
        private activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.artSub = this.activatedRoute.params.subscribe({
            next: (params: Params) => {
                this.artService
                .getArtworksSingle(params['id'])
                .subscribe({
                    next: (item: Artwork) => {
                        this.art = item;
                        console.log(item)
                    },
                    error: e => this.error = e
                })
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