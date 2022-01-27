import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '../../interfaces/anime';

const Card: FC<{ anime: Anime; id: string | number }> = ({ anime, id }) => (
    <Link href={`/anime/${id}`}>
        <a className="w-56 h-96 bg-blue-300 m-auto relative rounded-md shadow-black shadow-lg z-10">
            <div className="absolute z-10 bottom-3 backdrop-brightness-95 backdrop-blur">
                <h1 className="text-gray-100 font-mochiy text-xl text-center p-4 w-56">{anime.titles.en_jp}</h1>
            </div>
            <Image
                src={anime.posterImage.original ?? anime.posterImage.medium}
                layout="fill"
                className="z-0"
                priority
            />
        </a>
    </Link>
);

export default Card;
