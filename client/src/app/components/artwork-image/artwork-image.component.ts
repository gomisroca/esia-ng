import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-artwork-image',
    templateUrl: './artwork-image.component.html',
    styleUrls: ['./artwork-image.component.css']
})
export class ArtworkImageComponent implements OnInit {
    @Input() imageUrl: string = '';
    public environment = environment
    
    constructor(
    ) { }

    ngOnInit(): void {
        
    }
}
