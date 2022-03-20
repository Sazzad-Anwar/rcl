import React from 'react'
import { useState } from 'react'

export default function InstallingCodeArea({ yarn, npm }) {

    const [packageManager, setPackageManager] = useState('yarn')

    return (
        <>
            <div className="tabs">
                <a onClick={() => setPackageManager('yarn')} className={`tab tab-bordered ${packageManager === 'yarn' ? ' tab-active text-[#40a9ff]' : ''} text-lg font-semibold font-nunito`}>
                    <p className={`text-xl font-semibold ${packageManager === 'yarn' ? ' tab-active text-[#40a9ff]' : ''}`}>yarn</p>
                </a>
                <a onClick={() => setPackageManager('npm')} className={`tab tab-bordered ${packageManager === 'npm' ? ' tab-active text-[#40a9ff]' : ''} text-lg font-semibold font-nunito`}>
                    <p className={`text-xl font-semibold ${packageManager === 'npm' ? ' tab-active text-[#40a9ff]' : ''}`}>npm</p>
                </a>
            </div>

            {packageManager === 'yarn' ?
                <div className="mockup-code z-0 dark:bg-gray-900 normal-transition border border-transparent dark:border-gray-700 bg-gray-200 text-black rounded-md dark:text-white font-semibold font-nunito">
                    <pre data-prefix="$">
                        <code>{yarn}</code>
                    </pre>
                </div>
                :
                <div className="mockup-code z-0 dark:bg-gray-900 normal-transition border border-transparent dark:border-gray-700 bg-gray-200 text-black rounded-md dark:text-white font-semibold font-nunito">
                    <pre data-prefix="$">
                        <code>{npm}</code>
                    </pre>
                </div>
            }
        </>
    )
}
