import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Artist, Artwork, ArtworkStyle, Exhibition } from 'src/models';
import { environment } from 'src/environments/environment';

@Injectable({
     providedIn: 'root'
})
export class ArtService {

    constructor(private http: HttpClient) { }
    
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // Artworks
    getArtworks(): Observable<Array<Artwork>>{
        return this.http
        .get<Array<Artwork>>(`${environment.API_URL}/artworks/`)
        .pipe(
            catchError(this.handleError)
        );
    }    
    getArtworksSingle(id: any): Observable<Artwork>{
        return this.http
        .get<Artwork>(`${environment.API_URL}/artworks/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    // Artstyles
    getArtworkStyles(): Observable<Array<ArtworkStyle>>{
        return this.http
        .get<Array<ArtworkStyle>>(`${environment.API_URL}/artstyles/`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getArtworkStylesSingle(id: any): Observable<ArtworkStyle>{
        return this.http
        .get<ArtworkStyle>(`${environment.API_URL}/artstyles/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    // Exhibitions
    getExhibitions(): Observable<Array<Exhibition>>{
        return this.http
        .get<Array<Exhibition>>(`${environment.API_URL}/exhibitions/`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getExhibitionsSingle(id: any): Observable<Exhibition>{
        return this.http
        .get<Exhibition>(`${environment.API_URL}/exhibitions/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    // Artists
    getArtists(): Observable<Array<Artist>>{
        return this.http
        .get<Array<Artist>>(`${environment.API_URL}/artists/`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getArtistsSingle(id: any): Observable<any>{
        return this.http
        .get<any>(`${environment.API_URL}/artists/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    //Updates
    updateArtwork(id: any, artwork: Artwork): Observable<Artwork>{
        return this.http
        .post<Artwork>(`${environment.API_URL}/artworks/${id}`, artwork)
        .pipe(
            catchError(this.handleError)
        );
    }

    updateArtist(id: any, artist: Artwork): Observable<Artist>{
        return this.http
        .post<Artist>(`${environment.API_URL}/artists/${id}`, artist)
        .pipe(
            catchError(this.handleError)
        );
    }
    
    updateArtstyle(id: any, artstyle: ArtworkStyle): Observable<ArtworkStyle>{
        return this.http
        .post<ArtworkStyle>(`${environment.API_URL}/artstyles/${id}`, artstyle)
        .pipe(
            catchError(this.handleError)
        );
    }
    
    updateExhibition(id: any, exhibition: Exhibition): Observable<Exhibition>{
        console.log(id)
        console.log(exhibition)
        return this.http
        .post<Exhibition>(`${environment.API_URL}/exhibitions/${id}`, exhibition)
        .pipe(
            catchError(this.handleError)
        );
    }

    handleOrder(cart: any): void {
        cart = JSON.parse(cart);
        for(const item of cart) {
            if(item.ticket_amount){
                this.http
                .get(`${environment.API_URL}/exhibitions/order/${item.id}`)
                .pipe(
                    catchError(this.handleError)
                );
            } else{
                this.http
                .get(`${environment.API_URL}/artworks/order/${item.id}`)
                .pipe(
                    catchError(this.handleError)
                );
            }
        }
    }
}
