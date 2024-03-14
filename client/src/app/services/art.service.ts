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

    getArtworkStyles(): Observable<Array<ArtworkStyle>>{
        return this.http
        .get<Array<ArtworkStyle>>(`${environment.API_URL}/artstyles/`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getArtworkStylesSingle(id: any): Observable<Array<Artwork>>{
        return this.http
        .get<Array<Artwork>>(`${environment.API_URL}/artstyles/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

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

}
