import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Anime: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <h1> Details page for anime # {id}</h1>
        </div>
    );
};

export default Anime;
