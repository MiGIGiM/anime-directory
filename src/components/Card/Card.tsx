import { FC } from 'react';
import { Anime } from '../../interfaces/anime';
import Image from 'next/image';
import style from '../../../styles/Card.module.css';

const Card: FC<{anime:Anime}> = ({ anime }) => {
  const getAiring = (): string => {
    const start = new Date(anime.aired.from);
    const end = new Date(anime.aired.to);
    console.log(anime);

    if (end.toString() === 'Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)' && anime.type === 'TV') {
      return `${start.toLocaleDateString("en-US")} - Present`;
    }
    else if(anime.type !== 'TV') return start.toLocaleDateString("en-US");
    
    return `${start.toLocaleDateString("en-US")} - ${end.toLocaleDateString("en-US")}`;
    
  }
  return (
    <div className={`${style.flip}  p-5 bg-gray-300 rounded-md shadow drop-shadow-lg shadow-black`}>
      <div className={style.flipContent}>
        <div className={style.flipFront}>
          <div className="w-full h-full relative">
            <Image src={anime.images.webp.image_url} alt={`${anime.title} Poster`} layout="fill" priority />
          </div>
        </div>
        <div className={style.flipBack}>
          <div className="w-full h-full bg-gray-400 p-2 space-y-8 relative">
            <h1 className="font-mochiy text-xl text-white text-center mt-4">{anime.title}</h1>
            <div>
              <p className="text-white font-sans text-sm mx-auto font-medium text-center">
                {
                  anime.status
                }
              </p>
              <p className="text-white font-sans text-sm mx-auto font-medium text-center flex-wrap justify-center">
                { getAiring() }
              </p>
            </div>
            <span className="flex items-baseline justify-center flex-wrap absolute bottom-2">
              {
                anime.genres.map((genre) => (
                  <p key={genre.mal_id} className="bg-white rounded-full px-3 py-1 text-[10px] whitespace-nowrap text-gray-700 m-1">
                    {genre.name}
                  </p>
                ))
              }
            </span>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Card;