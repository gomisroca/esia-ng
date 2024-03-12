import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist, Artwork, ArtworkStyle, Exhibition } from 'src/models';
import { environment } from 'src/environments/environment';

@Injectable({
     providedIn: 'root'
})
export class ArtService {

    constructor(private http: HttpClient) { }

    getArtworks(): Observable<Array<Artwork>>{
        return this.http.get<Array<Artwork>>(`${environment.API_URL}/fetchDB/artworks`);
    }

    getArtworkStyles(): Observable<Array<ArtworkStyle>>{
        return this.http.get<Array<ArtworkStyle>>(`${environment.API_URL}/fetchDB/artwork-styles/`);
    }
    getArtworkStylesSingle(id: any): Observable<Array<Artwork>>{
        return this.http.get<Array<Artwork>>(`${environment.API_URL}/fetchDB/artwork-styles/${id}`);
    }

    getExhibitions(): Observable<Array<Exhibition>>{
        return this.http.get<Array<Exhibition>>(`${environment.API_URL}/fetchDB/exhibitions`);
    }
    getExhibitionsSingle(id: any): Observable<Exhibition>{
        return this.http.get<Exhibition>(`${environment.API_URL}/fetchDB/exhibitions/${id}`);
    }

    getArtists(): Observable<Array<Artist>>{
        return this.http.get<Array<Artist>>(`${environment.API_URL}/fetchDB/artists`);
    }
    getArtistsSingle(id: any): Observable<any>{
        return this.http.get<any>(`${environment.API_URL}/fetchDB/artists/${id}`);
    }

}
