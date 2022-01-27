import { Anime } from './anime';
import { Links } from './links';

export interface APIResponse {
    data: Anime[];
    meta: {
        count: number;
    };
    links: Links;
}
