import { useState, useEffect } from 'react';
import { APIResponse } from '../interfaces/APIResponse';
import { Anime } from '../interfaces/anime';
import { Pagination } from '../interfaces/pagination';

type Status = 'unloaded' | 'loading' | 'loaded';

export default function useAnimeList(url: string): [Anime[], Status, Pagination] {
    const [animeList, setAnimeList] = useState([] as Anime[]);
    const [pagination, setPagination] = useState({} as Pagination);
    const [status, setStatus] = useState('unloaded' as Status);

    useEffect(() => {
        async function fetchData() {
            setAnimeList([]);
            setPagination({
                last_visible_page: 0,
                has_next_page: false,
            });
            setStatus('loading');
            const res = await fetch(url);
            const json = (await res.json()) as APIResponse;
            setAnimeList(json.data);
            setPagination(json.pagination);
            setStatus('loaded');
        }
        fetchData();
    }, [url]);

    return [animeList, status, pagination];
}
