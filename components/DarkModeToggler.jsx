import { useEffect, useState } from 'react';
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";

const DarkModeToggler = () => {
    const [theme, setTheme] = useState('dark');


    useEffect(() => {
        if (typeof window !== undefined) {
            if ((localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
            ) {
                document.documentElement.classList.add('dark');
                setTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
                setTheme('light');
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme]);

    return (
        <button
            onClick={() => {
                if (theme === 'dark') {
                    localStorage.setItem('theme', 'light');
                    setTheme('light');
                } else {
                    localStorage.setItem('theme', 'dark');
                    setTheme('dark');
                }
            }}
            className="cursor-pointer dark:text-gray-500 text-gray-600 hover:text-black dark:hover:text-white transition-all ease-in-out"
        >
            {theme === 'dark'
                ?
                <BsFillBrightnessHighFill className="bi bi-brightness-high-fill active:animate-ping text-xl dark:text-gray-500 text-gray-600 hover:text-black dark:hover:text-white normal-transition" />
                :
                <BsFillMoonStarsFill className="bi bi-moon-stars-fill active:animate-ping text-xl dark:text-gray-500 text-gray-600 hover:text-black dark:hover:text-white normal-transition" />
            }
        </button>
    );
};

export default DarkModeToggler;
