export interface Artwork {
    id: number;
    title: string;
    artist_id: string;
    artist: Artist;
    medium: string;
    date: string;
    origin: string;
    style: ArtworkStyle;
    style_id: string;
    image: string;
    price: number;
    amount: number;
}

export interface ArtworkStyle {
    id: string;
    title: string;
    banner: string;
}

export interface Exhibition {
    id: number;
    title: string;
    url: string;
    start: string;
    end: string;
    description: string;
    gallery: string;
    price: number;
    stock: number;
}

export interface Artist {
    id: number;
    title: string;
    sort_title: string;
    birth: number;
    death: number;
    description: string;
}