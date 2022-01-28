import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import useAnime from '../../src/hooks/useAnime';

const Anime: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [anime, status] = useAnime(id as string);
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const capitalizeStatus = () => {
        const airing = anime.status;
        return airing.charAt(0).toUpperCase() + airing.slice(1);
    };
    const colorizeScore = (): string => {
        if (anime.averageRating >= 75) return 'text-green-500';
        if (anime.averageRating >= 50) return 'text-yellow-600';
        if (anime.averageRating >= 25) return 'text-orange-500';
        return 'text-red-500';
    };
    const colorizeRating = (): string => {
        if (anime.ageRating === 'G') return 'text-green-500';
        if (anime.ageRating === 'PG') return 'text-yellow-600';
        if (anime.ageRating === 'R') return 'text-orange-500';
        if (anime.ageRating === 'R18') return 'text-red-500';
        return 'text-gray-500';
    };
    return (
        <>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'loaded' && (
                <main>
                    <section className="relative block h-[500px]">
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover backdrop-blur-sm"
                            style={{
                                backgroundImage: `url(${
                                    anime.coverImage
                                        ? anime.coverImage.original
                                        : 'https://hdwallpaperim.com/wp-content/uploads/2017/09/17/64380-minimalism-gradient.jpg'
                                })`,
                            }}
                        />
                    </section>
                    <section className="relative py-16 bg-slate-300">
                        <div className="container mx-auto px-4">
                            <div className="relative flex flex-col min-w 0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="h-96 w-60 shadow-xl align-middle border-none absolute -top-60 md:-top-72 lg:-top-60">
                                                <div className="relative h-full w-full">
                                                    <Image
                                                        src={
                                                            anime.posterImage.original ??
                                                            'https://hdwallpaperim.com/wp-content/uploads/2017/09/17/64380-minimalism-gradient.jpg'
                                                        }
                                                        layout="fill"
                                                        alt={`${anime.canonicalTitle} poster`}
                                                        className="shadow-xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                    <div className="mr-4 p-3 text-center">
                                                        <span
                                                            className={`text-xl font-bold block uppercase tracking-wide ${colorizeRating()}`}
                                                        >
                                                            {anime.ageRating}
                                                        </span>
                                                        <span className="text-sm text-blueGray-400">Age Rating</span>
                                                    </div>
                                                    <div className="mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block tracking-wide">
                                                            {capitalizeStatus()}
                                                        </span>
                                                        <span className="text-sm text-blueGray-400">Status</span>
                                                    </div>
                                                    <div className="lg:mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide">
                                                            {anime.subtype}
                                                        </span>
                                                        <span className="text-sm text-blueGray-400">Type</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block uppercase tracking-wide">
                                                        {anime.episodeCount ?? '-'}
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Episodes</span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span
                                                        className={`${colorizeScore()} text-xl font-bold block uppercase tracking-wide`}
                                                    >
                                                        {anime.averageRating}
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Score</span>
                                                </div>
                                                <div className="lg:mr-4 p-3 text-center">
                                                    <span
                                                        className={`${
                                                            anime.popularityRank <= 10 ? 'text-[#FFD700]' : ''
                                                        } text-xl font-bold block uppercase tracking-wide`}
                                                    >
                                                        {anime.popularityRank}
                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Rank</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                            {anime.canonicalTitle}
                                        </h3>
                                        <h4 className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                            {`${anime.titles.en_jp}, ${anime.titles.ja_jp}`}
                                        </h4>
                                        <p className="mb-2 mt-10">
                                            {anime.subtype === 'TV'
                                                ? `${anime.startDate} to ${anime.endDate ?? 'ongoing'}`
                                                : anime.startDate}
                                        </p>
                                        <div className="inset-0 flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={openModal}
                                                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                            >
                                                Watch Trailer
                                            </button>
                                        </div>
                                        <Transition appear show={open} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto"
                                                onClose={closeModal}
                                            >
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
                                                    <span
                                                        className="inline-block h-screen align-middle"
                                                        aria-hidden="true"
                                                    >
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
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-lg font-medium leading-6 text-gray-900"
                                                            >
                                                                {`${anime.canonicalTitle} Trailer`}
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <iframe
                                                                    width="100%"
                                                                    height="315"
                                                                    src={`https://www.youtube.com/embed/${anime.youtubeVideoId}?controls=0"`}
                                                                    title={`${anime.canonicalTitle} Trailer`}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                />
                                                            </div>

                                                            <div className="mt-4">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                                    onClick={closeModal}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                    </div>
                                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                    {anime.synopsis}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            )}
        </>
    );
};

export default Anime;
