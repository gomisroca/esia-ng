import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionSingleComponent } from './components/collection/collection-single/collection-single.component';
import { ExhibitionsComponent } from './components/exhibitions/exhibitions.component';
import { HomeComponent } from './components/home/home.component';
import { ExhibitionSingleComponent } from './components/exhibitions/exhibition-single/exhibition-single.component';
import { ArtistSingleComponent } from './components/artists/artist-single/artist-single.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ArtworkSingleComponent } from './components/artworks/artwork-single/artwork-single.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'artworks/:id',
        component: ArtworkSingleComponent,
    },
    {
        path: 'collections',
        component: CollectionComponent,
    },
    {
        path: 'collections/:id',
        component: CollectionSingleComponent
    },
    {
        path: 'artists',
        component: ArtistsComponent,
    },
    {
        path: 'artists/:id',
        component: ArtistSingleComponent,
    },
    {
        path: 'exhibitions',
        component: ExhibitionsComponent,
    },
    {
        path: 'exhibitions/:id',
        component: ExhibitionSingleComponent,
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
