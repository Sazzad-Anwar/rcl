import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Menu({ menuItem }) {

    const router = useRouter();
    return (
        <div className={
            router.pathname === menuItem.link ?
                "bg-gray-200 border-l-2 border-l-black dark:text-white text-black dark:bg-gray-900 dark:border-l-gray-400 w-full block py-2 text-lg font-medium" :
                "hover:bg-gray-200 border-l-2 border-l-transparent dark:hover:border-l-gray-400 hover:border-l-black w-full block normal-transition dark:hover:bg-gray-900 dark:text-white text-black py-2 text-lg font-medium"
        }>
            <span className='px-4'>
                {menuItem.name}
            </span>
        </div>
    )
}