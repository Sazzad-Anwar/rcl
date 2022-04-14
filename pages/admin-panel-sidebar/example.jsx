
import React from 'react'
import dynamic from 'next/dynamic'
// import AdminLayout from '../../components/AdminLayout'
const AdminLayout = dynamic(() => import('../../components/AdminLayout'), { ssr: false });


export default function exampleCode() {
    return (<>
        <AdminLayout />
    </>)
}
