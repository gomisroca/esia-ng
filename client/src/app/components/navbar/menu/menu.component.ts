import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtService } from 'src/app/services/art.service';
import { Exhibition } from 'src/models';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
    private exhSub !: Subscription;
    public exhibitions !: Array<Exhibition>;
    public error !: Error;

    constructor(
        public artService: ArtService,
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

    ngOnDestroy(): void {
        if (this.exhSub){
            this.exhSub.unsubscribe();
        }
    }
}
