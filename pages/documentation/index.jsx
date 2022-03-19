/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import dynamic from 'next/dynamic';
const Documentation = dynamic(() => import('../../components/Documentation'), { ssr: false, loading: () => <Loader /> });
import src from './src.json';
import Layout from '../../projectComponents/Layout';
import Loader from '../../projectComponents/Loader';
import Head from 'next/head';
const CodeEditorInput = dynamic(() => import('../../projectComponents/CodeEditorInput'), { ssr: false, loading: () => <Loader /> });
import { BsCodeSlash } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa'
import fs from 'fs'
import path from 'path'
import Alert from '../../projectComponents/Alert';

export const getStaticProps = async () => {
    let documentation = fs.readFileSync(path.join(process.cwd(), '/components/Documentation.jsx'), 'utf8');
    let component = fs.readFileSync(path.join(process.cwd(), '/pages/documentation/ExampleCode.jsx'), 'utf8');

    return {
        props: {
            code: {
                documentation,
                component
            }
        }
    }
}

export default function index({ code }) {

    const [activeTab, setActiveTab] = useState('example');
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            let copyShowTimer = setTimeout(() => {
                setCopied(false)
            }, 3000)
        }

        return () => clearTimeout(copyShowTimer)

    }, [copied])

    return (
        <Layout>
            <Head>
                <title>RCL- Documentation</title>
            </Head>
            <div className='w-auto mb-4'>
                <h1 className='text-lg dark:text-white normal-transition font-semibold font-nunito mb-3'>Required npm packages need to be installed.</h1>
                <div className="mockup-code dark:bg-gray-900 normal-transition border border-transparent dark:border-gray-700 bg-gray-200 text-black rounded-md dark:text-white font-semibold font-nunito">
                    <pre data-prefix="$">
                        <code>npm i react-json-view axios react-icons</code>
                    </pre>
                    <div className='w-full text-left my-2 pl-7'>
                        <span className='text-sm font-nunito'>or using yarn</span>
                    </div>
                    <pre data-prefix="$">
                        <code>yarn add react-json-view axios react-icons</code>
                    </pre>
                </div>
            </div>

            <div className="tabs">
                <a onClick={() => setActiveTab('example')} className={`tab tab-bordered ${activeTab === 'example' ? ' tab-active text-[#40a9ff]' : ''} text-lg font-semibold font-nunito`}>Example</a>
                <a onClick={() => setActiveTab('code')} className={`tab tab-bordered ${activeTab === 'code' ? ' tab-active' : ''} text-black dark:text-white`}>
                    <BsCodeSlash className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
            </div>
            {copied && <Alert message="Copied !" setCopied={setCopied} />}

            {activeTab === 'example' && <Documentation src={src} title="API documentation using Documentation component" />}
            {activeTab === 'code' && <>
                <h1 className='text-lg dark:text-white my-4 sticky top-0'>Documentation.jsx
                    <a onClick={() => { navigator.clipboard.writeText(code.documentation); setCopied(true) }} className="tab tab-bordered cursor-pointer normal-transition group hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-90 scale-100 mx-3">
                        <button className="dark:border-gray-700 my-1 dark:text-gray-700 text-gray-400 norma-transition dark:group-hover:text-gray-500">
                            <FaCopy className='text-base' />
                        </button>
                    </a>
                </h1>
                <div className='h-96 overflow-auto'>
                    <div className="w-tc-editor-var"> </div>
                    <CodeEditorInput
                        code={code.documentation}
                    />
                </div>

                <h1 className='text-lg dark:text-white my-4 sticky top-0'>{'Your component'}.jsx
                    <a onClick={() => { navigator.clipboard.writeText(code.component); setCopied(true) }} className="tab tab-bordered cursor-pointer normal-transition group hover:bg-gray-300 dark:hover:bg-gray-800 active:scale-90 scale-100 mx-3">
                        <button className="dark:border-gray-700 my-1 dark:text-gray-700 text-gray-400 norma-transition dark:group-hover:text-gray-500">
                            <FaCopy className='text-base' />
                        </button>
                    </a>
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