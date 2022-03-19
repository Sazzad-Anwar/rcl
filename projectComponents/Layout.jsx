import React from 'react'
import Link from 'next/link'
import Menu from './Menu'
import DarkModeToggler from '../components/DarkModeToggler'
import packageJson from '../package.json';

export default function Layout({ children, className }) {

    let menulist = [
        {
            name: 'Home',
            link: '/',
            id: 'home'
        },
        {
            name: 'Rest API docs',
            link: '/documentation',
            id: 'rest-api-docs'
        }
    ]

    return (
        <div className='flex dark:bg-gray-900 normal-transition'>
            <aside className='w-72 normal-transition min-h-screen dark:bg-gray-800 bg-gray-100 border-r dark:border-r-gray-900 border-l-gray-400 py-2 overflow-auto'>
                <p className='text-xl dark:text-white normal-transition font-nunito w-auto mx-3 py-3 font-bold mb-4'>React Components Lab</p>
                {menulist.map(menuItem => (
                    <Link key={menuItem.id} href={menuItem.link}>
                        <a>
                            <Menu menuItem={menuItem} />
                        </a>
                    </Link>
                ))}
            </aside>
            <main className='w-full h-screen overflow-auto'>
                <header className='py-6 px-8 flex justify-end items-center w-full ml-auto sticky top-0 bg-white dark:bg-gray-900'>
                    <h1 className='dark:text-white text-base font-nunito font-bold mr-3 bg-gray-300 dark:bg-gray-800 px-3 py-0 rounded-full'>v{packageJson.version}</h1>
                    <DarkModeToggler className='mr-auto' />
                </header>
                <div className={'px-5 overflow-x-hidden' + (className ? className : '')}>
                    {children}
                </div>
            </main>
        </div>
    )
}
