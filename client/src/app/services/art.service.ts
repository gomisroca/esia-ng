import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist, Artwork, ArtworkStyle, Exhibition } from 'src/models';

@Injectable({
     providedIn: 'root'
})
export class ArtService {

    constructor(private http: HttpClient) { }

    getArtworks(): Observable<Array<Artwork>>{
        return this.http.get<Array<Artwork>>(`http://localhost:3030/fetchDB/artworks`);
    }

    getArtworkStyles(): Observable<Array<ArtworkStyle>>{
        return this.http.get<Array<ArtworkStyle>>(`http://localhost:3030/fetchDB/artwork-styles/`);
    }
    getArtworkStylesSingle(id: any): Observable<Array<Artwork>>{
        return this.http.get<Array<Artwork>>(`http://localhost:3030/fetchDB/artwork-styles/${id}`);
    }

    getExhibitions(): Observable<Array<Exhibition>>{
        return this.http.get<Array<Exhibition>>(`http://localhost:3030/fetchDB/exhibitions`);
    }
    getExhibitionsSingle(id: any): Observable<Exhibition>{
        return this.http.get<Exhibition>(`http://localhost:3030/fetchDB/exhibitions/${id}`);
    }

    getArtists(): Observable<Array<Artist>>{
        return this.http.get<Array<Artist>>(`http://localhost:3030/fetchDB/artists`);
    }
    getArtistsSingle(id: any): Observable<any>{
        return this.http.get<any>(`http://localhost:3030/fetchDB/artists/${id}`);
    }

}
