export interface Artwork {
    id: number;
    title: string;
    artist_id: number;
    artist: string;
    medium: string;
    date: string;
    origin: string;
    style: string;
    thumbnail: string;
    fullImage: string;
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
    start: string;
    end: string;
    image: string;
    url: string;
    description: string;
    gallery: string;
    ticket_price: number;
    ticket_amount: number;
}

export interface Artist {
    id: number;
    title: string;
    sort_title: string;
    birth: number;
    death: number;
    description: string;
}