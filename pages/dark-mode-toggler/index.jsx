/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../../projectComponents/Layout'
import Alert from '../../projectComponents/Alert';
import Loader from '../../projectComponents/Loader';
import dynamic from 'next/dynamic';
import { BsCodeSlash } from "react-icons/bs";
import { MdWebAsset } from "react-icons/md";
const ExampleCode = dynamic(() => import('./ExampleCode'), { ssr: false, loading: () => <Loader /> });
const CodeEditorInput = dynamic(() => import('../../projectComponents/CodeEditorInput'), { ssr: false, loading: () => <Loader /> });
import fs from 'fs'
import path from 'path'

export function getStaticProps() {
    let toggler = fs.readFileSync(path.join(process.cwd(), '/components/DarkModeToggler.jsx'), 'utf8');
    let component = fs.readFileSync(path.join(process.cwd(), '/pages/dark-mode-toggler/ExampleCode.jsx'), 'utf8');
    return {
        props: {
            code: {
                toggler,
                component
            }
        }
    }
}


export default function index({ code }) {

    const [activeTab, setActiveTab] = useState('example');
    const [copied, setCopied] = useState(false)

    return (
        <Layout>
            <Head>
                <title>RCL- Dark Mode toggler</title>
            </Head>
            <div className='w-auto mb-4'>
                <h1 className='text-lg dark:text-white normal-transition font-semibold font-nunito mb-3'>
                    Dark mode toggler is totally dependable on tailwind css. So, to utilize it you must need to install tailwind css in your project. Check <a href="https://tailwindcss.com/" className='underline-offset-1 underline'><i><b>Tailwind CSS</b></i></a> to install.
                </h1>

                <h1 className='text-lg dark:text-white normal-transition font-semibold font-nunito mb-3'>
                    Required npm packages need to be installed.
                </h1>

                <div className="mockup-code z-0 dark:bg-gray-900 normal-transition border border-transparent dark:border-gray-700 bg-gray-200 text-black rounded-md dark:text-white font-semibold font-nunito">
                    <pre data-prefix="$">
                        <code>npm i react-icons</code>
                    </pre>
                    <div className='w-full text-left my-2 pl-7'>
                        <span className='text-sm font-nunito'>or using yarn</span>
                    </div>
                    <pre data-prefix="$">
                        <code>yarn add react-icons</code>
                    </pre>
                </div>

            </div>

            <div className="tabs">
                <a onClick={() => setActiveTab('example')} className={`tab tab-bordered ${activeTab === 'example' ? ' tab-active text-[#40a9ff]' : ''} text-lg font-semibold font-nunito`}>
                    <MdWebAsset className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
                <a onClick={() => setActiveTab('code')} className={`tab tab-bordered ${activeTab === 'code' ? ' tab-active' : ''} text-black dark:text-white`}>
                    <BsCodeSlash className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
            </div>
            {copied && <Alert message="Copied !" setCopied={setCopied} />}

            {activeTab === 'example' && <ExampleCode />}

            {activeTab === 'code' && <>
                <h1 className='text-lg dark:text-white my-4 sticky top-40'>DarkModeToggler.jsx
                    <Alert message="Copied !" copyElement={code.toggler} />
                </h1>
                <div className='h-96 overflow-auto'>
                    <div className="w-tc-editor-var"> </div>
                    <CodeEditorInput
                        code={code.toggler}
                    />
                </div>

                <h1 className='text-lg dark:text-white my-4 sticky top-0'>{'Your component'}.jsx
                    <Alert message="Copied !" copyElement={code.component} />
                </h1>
                <div className='h-96 overflow-auto mb-5'>
                    <div className="w-tc-editor-var"> </div>
                    <CodeEditorInput
                        code={code.component}
                    />
                </div>
            </>}

        </Layout>
    )
}
