import { useState, useEffect } from 'react';
import { APIResponseDetails } from '../interfaces/APIResponse';
import { Anime } from '../interfaces/anime';

type Status = 'unloaded' | 'loading' | 'loaded';

export default function useAnime(id: string | number): [Anime, Status] {
    const [anime, setAnime] = useState({} as Anime);
    const [status, setStatus] = useState('unloaded' as Status);

    useEffect(() => {
        async function fetchData() {
            setStatus('loading');
            const res = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
            const json = (await res.json()) as APIResponseDetails;
            setAnime(json.data.attributes);
            setStatus('loaded');
        }
        fetchData();
    }, [id]);
    return [anime, status];
}
