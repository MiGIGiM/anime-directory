import type { NextPage } from 'next';
import { useState, useEffect, Fragment } from 'react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { AdjustmentsIcon, SearchIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import useAnimeList from '../src/hooks/useAnimeList';
import Loader from '../src/components/SVGs/Search';
import Card from '../src/components/Card';

const baseUrl = 'https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=0';

const Home: NextPage = () => {
    const [url, setUrl] = useState(baseUrl);
    const [animeList, status, links] = useAnimeList(url);
    const [animes, setAnimes] = useState(animeList);
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const searchAnime = () => {
        if (query.length > 0) {
            setAnimes([]);
            setUrl(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page%5Blimit%5D=20&page%5Boffset%5D=0`);
            setQuery('');
        }
    };

    const sortAnime = (sort: string) => {
        setAnimes([]);
        setUrl(sort);
    };

    useEffect(() => {
        const newAnimes = [...animes, ...animeList];
        setAnimes(newAnimes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animeList]);

    return (
        <div className="bg-[#f2efe7] py-5 px-2 xl:flex xl:flex-row-reverse items-start justify-center xl:space-y-0 space-y-10 min-h-screen">
            <nav
                className="font-mochiy p-3 m-2 bg-white rounded flex justify-between items-baseline
                transition-all delay-300 duration-300 ease-in-out shadow-black hover:drop-shadow-xl xl:block xl:w-3/12 xl:ml-20 sticky xl:top-10"
            >
                <Link href="/">
                    <a className="text-lg hover:opacity-30 text-gray-700 w-fit cursor-pointer md:text-2xl xl:px-6 xl:text-3xl">
                        Anime Directory
                    </a>
                </Link>
                <div className="flex justify-evenly xl:hidden items-center space-x-6">
                    <button type="button" onClick={openModal}>
                        <SearchIcon className="w-5 h-5 md:w-8 mdh-8 focus:opacity-50 focus:text-slate-700" />
                    </button>
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                            <div className="min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed inset-0" />
                                </Transition.Child>
                                <span className="inline-block h-screen align-middle" aria-hidden="true">
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            Search Anime
                                        </Dialog.Title>
                                        <div className="mt-2 space-y-4">
                                            <form
                                                className="flex bg-gray-200 p-4 w-full space-x-4 rounded-lg items-center"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    closeModal();
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
                                                className="bg-indigo-600 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg mx-auto"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    closeModal();
                                                    searchAnime();
                                                }}
                                            >
                                                <span>Search</span>
                                            </button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                    <Menu as="div">
                        <div>
                            <Menu.Button>
                                <AdjustmentsIcon className="w-5 h-5 md:w-8 mdh-8 hover:opacity-50 hover:text-slate-700" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-50 text-sm font-sans w-56 flex flex-col justify-start space-y-3 p-3 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-fuchsia-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?filter[subtype]=movie&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            Show Movies
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-sky-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?filter[subtype]=tv&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            Show TV
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-rose-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?sort=popularityRank&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            Sort by Popularity
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-rose-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?sort=slug&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            A - Z
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className=" hidden xl:flex flex-col items-center p-2 space-x-2 h-fit w-fit mx-auto my-5 font-mono xl:space-x-0">
                    <form
                        className="flex bg-gray-200 p-4 w-72 space-x-4 rounded-lg"
                        onSubmit={(e) => {
                            e.preventDefault();
                            searchAnime();
                        }}
                    >
                        <button type="submit">
                            <SearchIcon className="h-6 w-6 opacity-30" />
                        </button>
                        <input
                            className="bg-gray-200 outline-none"
                            type="text"
                            placeholder="Title..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                    <Menu as="div" className="w-72">
                        <div className="mt-5 bg-gray-200 p-4 w-full rounded-lg">
                            <Menu.Button className="w-full text-right text-gray-700 inline-flex justify-between">
                                Sort By
                                <ChevronDownIcon className="h-6 w-6 opacity-30" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-[5.5rem] z-50 text-sm font-sans w-56 flex flex-col justify-start space-y-3 p-3 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-fuchsia-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?filter[subtype]=movie&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            Show Movies
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-sky-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?filter[subtype]=tv&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            Show TV
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-rose-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?sort=popularityRank&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            Sort by Popularity
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="button"
                                            className={`${
                                                active && 'bg-rose-500 text-white font-semibold'
                                            } rounded text-left p-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sortAnime(
                                                    'https://kitsu.io/api/edge/anime?sort=slug&page%5Blimit%5D=20&page%5Boffset%5D=0'
                                                );
                                            }}
                                        >
                                            A - Z
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </nav>
            {status !== 'loaded' && animes.length === 0 ? (
                <div className="h-screen w-full xl:w-5/12 flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <section className="flex justify-center flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
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
