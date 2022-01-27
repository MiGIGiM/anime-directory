import { useState, useEffect } from 'react';
import { APIResponse } from '../interfaces/APIResponse';
import { Anime } from '../interfaces/anime';
import { Links } from '../interfaces/links';

type Status = 'unloaded' | 'loading' | 'loaded';

export default function useAnimeList(url: string): [Anime[], Status, Links] {
    const [animeList, setAnimeList] = useState([] as Anime[]);
    const [links, setLinks] = useState({} as Links);
    const [status, setStatus] = useState('unloaded' as Status);

    useEffect(() => {
        async function fetchData() {
            setLinks({
                first: '',
                last: '',
                next: '',
            });
            setStatus('loading');
            const res = await fetch(url);
            const json = (await res.json()) as APIResponse;
            setAnimeList([...json.data]);
            setLinks(json.links);
            setStatus('loaded');
        }
        fetchData();
    }, [url]);
    return [animeList, status, links];
}
