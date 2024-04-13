import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { environment } from 'src/environments/environment';
import { Exhibition } from 'src/models';

@Component({
    selector: 'app-exhibition-single',
    templateUrl: './exhibition-single.component.html',
    styleUrls: ['./exhibition-single.component.css']
})

export class ExhibitionSingleComponent implements OnInit, OnDestroy {
    private exhSub !: Subscription;
    public exh !: Exhibition;
    public error !: Error;
    public environment = environment;

    constructor(
        public artService: ArtService,
        private activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.exhSub = this.activatedRoute.params.subscribe({
            next: (params: Params) => {
                this.artService
                .getExhibitionsSingle(params['id'])
                .subscribe({
                    next: (item: Exhibition) => {
                        this.exh = item;
                    },
                    error: e => this.error = e
                })
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