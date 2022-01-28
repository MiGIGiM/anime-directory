import { Anime } from './anime';
import { Links } from './links';

export interface APIResponse {
    data: Anime[];
    meta: {
        count: number;
    };
    links: Links;
}

export interface APIResponseDetails {
    data: {
        id: string;
        type: string;
        links: {
            self: string;
        };
        attributes: Anime;
        relationships: {
            genres: {
                links: {
                    related: string;
                    self: string;
                };
            };
            categories: {
                links: {
                    related: string;
                    self: string;
                };
            };
            castings: {
                links: {
                    related: string;
                    self: string;
                };
            };
            installments: {
                links: {
                    related: string;
                    self: string;
                };
            };
            mappings: {
                links: {
                    related: string;
                    self: string;
                };
            };
            reviews: {
                links: {
                    related: string;
                    self: string;
                };
            };
            mediaRelationships: {
                links: {
                    related: string;
                    self: string;
                };
            };
            characters: {
                links: {
                    related: string;
                    self: string;
                };
            };
            staff: {
                links: {
                    related: string;
                    self: string;
                };
            };
            productions: {
                links: {
                    related: string;
                    self: string;
                };
            };
            quotes: {
                links: {
                    related: string;
                    self: string;
                };
            };
            episodes: {
                links: {
                    related: string;
                    self: string;
                };
            };
            streamingLinks: {
                links: {
                    related: string;
                    self: string;
                };
            };
            animeProductions: {
                links: {
                    related: string;
                    self: string;
                };
            };
            animeCharacters: {
                links: {
                    related: string;
                    self: string;
                };
            };
            animeStaff: {
                links: {
                    related: string;
                    self: string;
                };
            };
        };
    };
}
