import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Menu({ menuItem }) {

    const router = useRouter();
    console.log(router.pathname)

    return (
        <div className={router.pathname === menuItem.link ? "bg-gray-300 dark:text-white text-black dark:bg-gray-600 w-full block py-1 text-lg font-medium" : "hover:bg-gray-300 w-full block normal-transition dark:hover:bg-gray-600 dark:text-white text-black py-1 text-lg font-medium"}>
            <span className='px-4'>
                {menuItem.name}
            </span>
        </div>
    )
}