import { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa'

export default function Alert({ message, copyElement }) {

    const [copied, setCopied] = useState(false)

    useEffect(() => {
        let copyShowTimer;
        if (copied && !copyShowTimer) {
            copyShowTimer = setTimeout(() => {
                setCopied(false)
            }, 3000)
        }
        else {
            clearTimeout(copyShowTimer)
            setCopied(false)
            copyShowTimer = setTimeout(() => {
                setCopied(false)
            }, 3000)
        }

        return () => clearTimeout(copyShowTimer)

    }, [copied])

    const handleClick = () => {
        navigator.clipboard.writeText(copyElement);
        setCopied(true)
    }

    return (
        <>
            <a onClick={handleClick} className="tab tab-bordered cursor-pointer normal-transition group hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-90 scale-100 mx-3">
                <button className="dark:border-gray-700 my-1 dark:text-gray-700 text-gray-400 norma-transition dark:group-hover:text-gray-500">
                    <FaCopy className='text-base' />
                </button>
            </a>
            {copied &&
                <div className='fixed left-4 top-[55px] w-full animate__animated animate__bounceInRight'>
                    <div id="toast-success" className="flex z-50 items-center absolute overflow-x-hidden top-5 right-10 p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </div>
                        <div className="ml-3 text-sm font-normal">{message}</div>
                        <button onClick={() => setCopied(false)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-1 focus:dark:ring-gray-700 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-collapse-toggle="toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            }

        </>

    )
}
