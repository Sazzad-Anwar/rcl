import React from 'react'
import { AiOutlineReload } from "react-icons/ai";

export default function Loader() {
    return (
        <div className='w-full h-full lg:w-96 lg:h-96 lg:mx-auto flex flex-col justify-center items-center'>
            <AiOutlineReload className='text-4xl font-bold dark:text-white font-ubuntu animate-spin normal-transition mt-2' />
        </div>
    )
}
