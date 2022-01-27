import type { NextPage } from 'next';
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import useAnimeList from '../src/hooks/useAnimeList';
import Loader from '../src/components/Loader';
import Card from '../src/components/Card';

const baseUrl = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&page%5Boffset%5D=0';

const Home: NextPage = () => {
    const [animeList, status, links] = useAnimeList(baseUrl);
    return (
        <div className="bg-[#f2efe7] py-5 px-2 overflow-x-hidden">
            <nav
                className="font-mochiy p-3 m-2 bg-white rounded flex justify-between items-baseline
                transition-all delay-300 duration-300 ease-in-out shadow-black hover:drop-shadow-xl"
            >
                <h1 className="text-lg hover:opacity-30 text-gray-700 w-fit cursor-pointer">Anime Directory</h1>
                <div className="flex space-x-4">
                    <SearchIcon className="w-5 h-5 focus:opacity-50 focus:text-slate-700" />
                </div>
            </nav>
            <section>
                {status !== 'loaded' ? (
                    <Loader title="Loading" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 justify-items-center mt-5">
                        {animeList.map((anime: any) => (
                            <Card key={anime.attributes.slug} anime={anime.attributes} />
                        ))}
                    </div>
                )}
            </section>
            <p>{links.next}</p>
        </div>
    );
};

export default Home;
