import type { NextPage } from 'next';
import { Fragment } from 'react';
import useAnimeList from '../src/hooks/useAnimeList';
import { Menu, Transition } from '@headlessui/react';
import { AdjustmentsIcon, SearchIcon } from '@heroicons/react/outline';
import Loader from '../src/components/Loader';
import Card from '../src/components/Card'; 

let baseUrl = 'https://api.jikan.moe/v4/anime';

const Home: NextPage = () => {
  const [animeList, status, pagination] = useAnimeList(baseUrl);
  return (
    <div className="bg-[#f2efe7] py-5 px-2 overflow-x-hidden">
        <nav 
          className="font-mochiy p-3 m-2 bg-white rounded flex justify-between items-baseline
          transition-all delay-300 duration-300 ease-in-out shadow-black hover:drop-shadow-xl">
            <h1 className="text-lg hover:opacity-30 text-gray-700 w-fit cursor-pointer">Anime Directory</h1>
            <div className="flex space-x-4">
              <SearchIcon className="w-5 h-5 focus:opacity-50 focus:text-slate-700" />
              <Menu as="div">
                <div>
                  <Menu.Button>
                      <AdjustmentsIcon className="w-5 h-5 hover:opacity-50 hover:text-slate-700" />
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
                          className={`${active && 'bg-blue-500 text-white font-semibold border-2 border-blue-700'} rounded text-left p-3`}
                        >
                          Show All
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active && 'bg-fuchsia-500 text-white font-semibold border-2 border-fuchsia-700'} rounded text-left p-3`}
                        >
                          Show Movies
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active && 'bg-sky-500 text-white font-semibold border-2 border-sky-700'} rounded text-left p-3`}
                        >
                          Show TV
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active && 'bg-rose-500 text-white font-semibold border-2 border-rose-700'} rounded text-left p-3`}
                        >
                          Sort by Popularity
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
        </nav>
        {
          status !== 'loaded' ? <Loader title='Loading' /> : 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 justify-items-center mt-5">
            {
              animeList.map((anime: any) => (
                <Card key={anime.mal_id} anime={anime} />
              ))
            }
          </div>
        }
    </div>
  )
}

export default Home
