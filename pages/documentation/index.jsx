/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import dynamic from 'next/dynamic';
const Documentation = dynamic(() => import('../../components/Documentation'), { ssr: false, loading: () => <Loader /> });
import src from './src.json';
import Layout from '../../projectComponents/Layout';
import Loader from '../../projectComponents/Loader';
import Head from 'next/head';
const CodeEditorInput = dynamic(() => import('../../projectComponents/CodeEditorInput'), { ssr: false, loading: () => <Loader /> });
import { BsCodeSlash, BsFullscreen } from "react-icons/bs";
import { MdWebAsset } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import fs from 'fs'
import path from 'path'
import Alert from '../../projectComponents/Alert';
import InstallingCodeArea from '../../projectComponents/InstallingCodeArea';

export const getStaticProps = async () => {
    let documentation = fs.readFileSync(path.join(process.cwd(), '/components/Documentation.jsx'), 'utf8');
    let component = fs.readFileSync(path.join(process.cwd(), '/pages/documentation/example.jsx'), 'utf8');

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
    const router = useRouter();

    return (
        <Layout>
            <Head>
                <title>RCL- Documentation</title>
            </Head>
            <div className='w-auto mb-4'>
                <h1 className='text-lg dark:text-white normal-transition font-semibold font-nunito pb-4'>
                    Required npm packages need to be installed.
                </h1>
                <InstallingCodeArea
                    yarn={`yarn add react-json-view axios react-icons`}
                    npm={`npm i react-json-view axios react-icons`}
                />
            </div>

            <div className="tabs">
                <a onClick={() => setActiveTab('example')} className={`tab tab-bordered ${activeTab === 'example' ? ' tab-active text-[#40a9ff]' : ''} text-lg font-semibold font-nunito`}>
                    <MdWebAsset className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
                <a onClick={() => setActiveTab('code')} className={`tab tab-bordered ${activeTab === 'code' ? ' tab-active' : ''} text-black dark:text-white`}>
                    <BsCodeSlash className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
                <a onClick={() => router.push('/documentation/example')} className={`tab tab-bordered text-black dark:text-white`}>
                    <BsFullscreen className={`text-xl font-bold`} />
                </a>
            </div>

            {activeTab === 'example' && <Documentation className="px-5" src={src} title="API documentation using Documentation component" />}
            {activeTab === 'code' && <>
                <h1 className='text-lg dark:text-white my-4 sticky top-40'>Documentation.jsx
                    <Alert message="Copied !" copyElement={code.documentation} />
                </h1>
                <div className='h-96 overflow-auto'>
                    <div className="w-tc-editor-var"> </div>
                    <CodeEditorInput
                        code={code.documentation}
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