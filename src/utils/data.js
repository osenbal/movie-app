import { SiYoutubegaming } from 'react-icons/si';
import { GiFilmStrip } from 'react-icons/gi';
import { AiOutlineTrophy } from 'react-icons/ai';
import { IoMusicalNote } from 'react-icons/io5';

export const categories = [
    { id: 1, name: "Gaming", path: "/category/gaming", iconSrc: <SiYoutubegaming fontSize={30} /> },
    { id: 2, name: "Films", path: "/category/films", iconSrc: <GiFilmStrip fontSize={30} /> },
    { id: 3, name: "Sport", path: "/category/sport    ", iconSrc: <AiOutlineTrophy fontSize={30} /> },
    { id: 4, name: "Music", path: "/category/music", iconSrc: <IoMusicalNote fontSize={30} /> }
]