
import React from 'react'
import dynamic from 'next/dynamic'
// import Sidebar from '../../components/Sidebar'
const Sidebar = dynamic(() => import('../../components/Sidebar'), { ssr: false });


export default function exampleCode() {
    return (<>
        <Sidebar />
    </>)
}
