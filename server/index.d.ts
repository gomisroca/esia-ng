interface Pagination {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
}

interface Info {
    license_text: string;
    license_links: string[];
    version: string;
}

interface Config {
    iiif_url: string;
    website_url: string;
}

type APIResponse = {
    preference: string | null;
    pagination: Pagination;
    info: Info;
    config: Config;
}