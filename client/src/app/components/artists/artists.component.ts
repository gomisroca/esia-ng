import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { Artist } from 'src/models';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css']
})
export class ArtistsComponent  implements OnInit, OnDestroy {
    private artSub !: Subscription;
    public artists !: Array<Artist>;
    public error !: Error;

    constructor(
        public artService: ArtService,
    ) { }

    ngOnInit(): void {
        this.artSub = this.artService
        .getArtists()
        .subscribe({
            next: (itemList: Array<Artist>) => {
                this.artists = itemList;
            },
            error: e => this.error = e
        })
    }

    ngOnDestroy(): void {
        if (this.artSub){
            this.artSub.unsubscribe();
        }
    }
}