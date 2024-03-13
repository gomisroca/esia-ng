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
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    getArtworks(): Observable<Array<Artwork>>{
        return this.http
        .get<Array<Artwork>>(`${environment.API_URL}/fetchDBs/artworks`)
        .pipe(
            catchError(this.handleError)
        );
    }

    getArtworkStyles(): Observable<Array<ArtworkStyle>>{
        return this.http
        .get<Array<ArtworkStyle>>(`${environment.API_URL}/fetchDB/artwork-styles/`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getArtworkStylesSingle(id: any): Observable<Array<Artwork>>{
        return this.http
        .get<Array<Artwork>>(`${environment.API_URL}/fetchDB/artwork-styles/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    getExhibitions(): Observable<Array<Exhibition>>{
        return this.http
        .get<Array<Exhibition>>(`${environment.API_URL}/fetchDB/exhibitions`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getExhibitionsSingle(id: any): Observable<Exhibition>{
        return this.http
        .get<Exhibition>(`${environment.API_URL}/fetchDB/exhibitions/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    getArtists(): Observable<Array<Artist>>{
        return this.http
        .get<Array<Artist>>(`${environment.API_URL}/fetchDB/artists`)
        .pipe(
            catchError(this.handleError)
        );
    }
    getArtistsSingle(id: any): Observable<any>{
        return this.http
        .get<any>(`${environment.API_URL}/fetchDB/artists/${id}`)
        .pipe(
            catchError(this.handleError)
        );
    }

}
