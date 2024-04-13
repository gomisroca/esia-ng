import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { environment } from 'src/environments/environment';
import { ArtworkStyle } from 'src/models';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnDestroy {
    private styleSub !: Subscription;
    public styles !: Array<ArtworkStyle>;
    public error !: Error;
    public environment = environment

    constructor(
        public artService: ArtService,
    ) { }

    ngOnInit(): void {
        this.styleSub = this.artService
        .getArtworkStyles()
        .subscribe({
            next: (itemList: Array<ArtworkStyle>) => {
                this.styles = itemList;
            },
            error: e => this.error = e
        })
    }

    ngOnDestroy(): void {
        if (this.styleSub){
            this.styleSub.unsubscribe();
        }
    }
}