/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../../projectComponents/Layout'
import Alert from '../../projectComponents/Alert';
import Loader from '../../projectComponents/Loader';
import dynamic from 'next/dynamic';
import { BsCodeSlash, BsFullscreen } from "react-icons/bs";
import { MdWebAsset } from "react-icons/md";
import InstallingCodeArea from '../../projectComponents/InstallingCodeArea';
import fs from 'fs'
import path from 'path'
const ExampleCode = dynamic(() => import('./example'), { ssr: false, loading: () => <Loader /> });
const CodeEditorInput = dynamic(() => import('../../projectComponents/CodeEditorInput'), { ssr: false, loading: () => <Loader /> });
import { useRouter } from 'next/router'


export function getStaticProps() {
    let adminLayout = fs.readFileSync(path.join(process.cwd(), '/components/AdminLayout.jsx'), 'utf8');
    let component = fs.readFileSync(path.join(process.cwd(), '/pages/admin-panel-sidebar/example.jsx'), 'utf8');
    let css = fs.readFileSync(path.join(process.cwd(), '/styles/adminLayout.module.css'), 'utf8');
    return {
        props: {
            code: {
                adminLayout,
                component,
                css
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
                    yarn={`yarn add antd react-icons`}
                    npm={`npm i antd react-icons`}
                />
            </div>

            <div className="tabs">
                <a onClick={() => setActiveTab('example')} className={`tab tab-bordered ${activeTab === 'example' ? ' tab-active text-[#40a9ff]' : ''} text-lg font-semibold font-nunito`}>
                    <MdWebAsset className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
                <a onClick={() => setActiveTab('code')} className={`tab tab-bordered ${activeTab === 'code' ? ' tab-active' : ''} text-black dark:text-white`}>
                    <BsCodeSlash className={`text-2xl font-bold ${activeTab === 'code' ? ' tab-active text-[#40a9ff]' : ''}`} />
                </a>
                <a onClick={() => router.push('/admin-panel-sidebar/example')} className={`tab tab-bordered text-black dark:text-white`}>
                    <BsFullscreen className={`text-xl font-bold`} />
                </a>
            </div>

            {activeTab === 'example' && <div className='mt-5 border dark:border-gray-700 pr-5'><ExampleCode /></div>}
            {activeTab === 'code' && <>
                <h1 className='text-lg dark:text-white my-4 sticky top-40'>Layout.jsx
                    <Alert message="Copied !" copyElement={code.adminLayout} />
                </h1>
                <div className='h-96 overflow-auto'>
                    <div className="w-tc-editor-var"> </div>
                    <CodeEditorInput
                        code={code.adminLayout}
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

                <h1 className='text-lg dark:text-white my-4 sticky top-0'>adminLayout.module.css or adminLayout.css
                    <Alert message="Copied !" copyElement={code.css} />
                </h1>
                <div className='h-96 overflow-auto mb-5'>
                    <div className="w-tc-editor-var"> </div>
                    <CodeEditorInput
                        code={code.css}
                    />
                </div>
            </>}

        </Layout>
    );
}