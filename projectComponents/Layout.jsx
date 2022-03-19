import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Menu from './Menu'
import DarkModeToggler from '../components/DarkModeToggler'
import packageJson from '../package.json';
import { BsGithub } from 'react-icons/bs';

export default function Layout({ children, className }) {

    const router = useRouter()

    let menulist = [
        {
            name: 'Dark Mode toggler',
            link: '/dark-mode-toggler',
            id: 'dark-mode-toggler'
        },
        {
            name: 'Rest API docs',
            link: '/documentation',
            id: 'rest-api-docs'
        },

    ]

    return (
        <div className='dark:bg-gray-900 bg-gray-100 normal-transition overflow-hidden min-h-screen'>
            <header className='border-b fixed top-0 w-full dark:border-b-gray-900 border-b-gray-300 py-2 pr-8  ml-auto bg-gray-100 dark:bg-gray-900 z-10'>
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-2xl normal-transition font-nunito w-auto mx-3 py-3 font-extrabold purple-text'>
                        React Components Lab
                    </h1>
                    <div className='flex items-center'>
                        <a href='https://github.com/Sazzad-Anwar/rcl' className='dark:text-white text-base font-nunito font-bold mr-3 bg-gray-300 dark:bg-gray-800 p-2 rounded-full'><BsGithub className='text-xl' /></a>
                        <h1 className='dark:text-white text-base font-nunito font-bold mr-3 bg-gray-300 dark:bg-gray-800 px-3 py-0 rounded-full'>v{packageJson.version}</h1>
                        <DarkModeToggler className='mr-auto' />
                    </div>
                </div>
            </header>
            <div className="flex mt-[67px] container mx-auto relative">
                <aside className='hidden lg:block w-72 normal-transition h-auto fixed top-[73px] z-10 min-h-full dark:bg-gray-800 bg-gray-100 border-r dark:border-r-gray-900 border-r-gray-300 py-0'>
                    <Link href='/'>
                        <a>
                            <div className={
                                router.pathname === '/' ?
                                    "bg-gray-200 border-l-2 border-l-black dark:text-white text-black dark:bg-gray-900 dark:border-l-gray-400 w-full block py-2 text-lg font-medium" :
                                    "hover:bg-gray-200 border-l-2 border-l-transparent dark:hover:border-l-gray-400 hover:border-l-black w-full block normal-transition dark:hover:bg-gray-900 dark:text-white text-black py-2 text-lg font-medium"
                            }>
                                <span className='px-4'>
                                    Home
                                </span>
                            </div>
                        </a>
                    </Link>

                    <p className='mt-5 px-5 w-full block py-2 text-2xl font-bold border-b dark:border-b-gray-700 purple-text'>
                        Components
                    </p>

                    {menulist.map(menuItem => (
                        <Link key={menuItem.id} href={menuItem.link}>
                            <a>
                                <Menu menuItem={menuItem} />
                            </a>
                        </Link>
                    ))}
                </aside>
                <main className='w-full lg:pl-72'>
                    <div className={'px-5 pt-5' + (className ? className : '')}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
