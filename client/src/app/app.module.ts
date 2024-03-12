import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { CollectionSingleComponent } from './components/collection/collection-single/collection-single.component';
import { ExhibitionSingleComponent } from './components/exhibitions/exhibition-single/exhibition-single.component';
import { ArtistSingleComponent } from './components/artists/artist-single/artist-single.component';
import { CartComponent } from './components/navbar/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component'; 

import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxImageZoomModule,
        NgxSkeletonLoaderModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatSnackBarModule
    ],  
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        GalleryComponent,
        MenuComponent,
        ArtistsComponent,
        CollectionComponent,
        ExhibitionsComponent,
        CollectionSingleComponent,
        ExhibitionSingleComponent,
        ArtistSingleComponent,
        CartComponent,
        CheckoutComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
