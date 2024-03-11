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
  private exhSub!: Subscription;
  public exhibitions!: Array<Exhibition>;

  constructor(
    public artService: ArtService,
  ) { }

  ngOnInit(): void {
    this.exhSub = this.artService
    .getExhibitions()
    .subscribe((itemList: Array<Exhibition>) => {
      this.exhibitions = itemList;
    })
  }

  ngOnDestroy(): void {
    if (this.exhSub){
      this.exhSub.unsubscribe();
    }
  }
}
