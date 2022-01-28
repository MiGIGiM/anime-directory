import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import useAnimeList from '../src/hooks/useAnimeList';
import Loader from '../src/components/Loader';
import Card from '../src/components/Card';
import Link from 'next/link';

const baseUrl = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=0';

const Home: NextPage = () => {
    const [url, setUrl] = useState(baseUrl);
    const [animeList, status, links] = useAnimeList(url);
    const [animes, setAnimes] = useState(animeList);
    const [query, setQuery] = useState('');

    const searchAnime = () => {
        setAnimes([]);
        setUrl(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page%5Blimit%5D=20&page%5Boffset%5D=0`);
        setQuery('');
    };

    useEffect(() => {
        const newAnimes = [...animes, ...animeList];
        setAnimes(newAnimes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animeList]);
    return (
        <div className="bg-[#f2efe7] py-5 px-2 lg:flex lg:flex-row-reverse items-start justify-center lg:space-y-0 space-y-10 min-h-screen">
            <nav
                className="font-mochiy p-3 m-2 bg-white rounded flex justify-between items-baseline
                transition-all delay-300 duration-300 ease-in-out shadow-black hover:drop-shadow-xl lg:block lg:w-3/12 lg:ml-20 sticky lg:top-10"
            >
                <Link href="/">
                    <a className="text-lg hover:opacity-30 text-gray-700 w-fit cursor-pointer lg:mx-auto xl:text-3xl">
                        Anime Directory
                    </a>
                </Link>
                <SearchIcon className="w-5 h-5 focus:opacity-50 focus:text-slate-700 lg:hidden" />
                <div className="flex items-center p-2 space-x-2 h-fit w-fit mx-auto my-5 font-mono">
                    <form
                        className="flex bg-gray-200 p-4 w-72 space-x-4 rounded-lg"
                        onSubmit={(e) => {
                            e.preventDefault();
                            searchAnime();
                        }}
                    >
                        <SearchIcon className="h-6 w-6 opacity-30" />
                        <input
                            className="bg-gray-200 outline-none"
                            type="text"
                            placeholder="Title..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                    <button
                        type="submit"
                        className="bg-indigo-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg hidden md:block"
                    >
                        <span>Search</span>
                    </button>
                </div>
            </nav>
            {status !== 'loaded' && animes.length === 0 ? (
                <Loader title="Loading" />
            ) : (
                <section className="flex justify-center flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center">
                        {animes.map((anime: any) => (
                            <Card key={anime.attributes.slug} anime={anime.attributes} id={anime.id} />
                        ))}
                    </div>
                    {links.next && (
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setUrl(links.next);
                            }}
                            className="bg-blue-400 w-full text-white inline-flex p-3 font-semibold rounded-md hover:bg-blue-500 mt-5 items-center justify-center"
                        >
                            Show More
                        </button>
                    )}
                </section>
            )}
        </div>
    );
};

export default Home;
