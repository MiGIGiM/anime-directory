import { FC } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '../../interfaces/anime';

const Card: FC<{ anime: Anime }> = ({ anime }) => {
    return (
        <div className="w-56 h-96 relative">
            <p>{anime.posterImage.original}</p>
        </div>
    );
};

export default Card;
