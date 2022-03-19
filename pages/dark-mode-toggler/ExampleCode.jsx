import Image from 'next/image'
import React from 'react'
import DarkModeToggler from '../../components/DarkModeToggler'

export default function ExampleCode() {
    return (
        <div className='mt-5'>
            <div className='w-96 h-auto group border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden relative'>
                <div className='absolute right-5 top-5 z-10'>
                    <DarkModeToggler />
                </div>
                <Image className='dark:brightness-50 brightness-100' src={'https://images.pexels.com/photos/5673835/pexels-photo-5673835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} height={325} width={392} objectFit="fill" alt="example-image" />
                <div className='p-5'>
                    <h1 className='dark:text-white text-2xl font-semibold font-nunito normal-transition'>This is an example</h1>
                    <p className='dark:text-white text-base font-semibold font-nunito mt-5 normal-transition'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum doloremque odio quidem maiores non nulla libero vel, amet fugit rem cupiditate id molestias ratione ab voluptatum ducimus consequatur? Eum ipsam vero corrupti nulla molestias unde error amet.
                    </p>
                </div>
            </div>
        </div>
    )
}
