import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic';
const DarkModeToggler = dynamic(() => import('../components/DarkModeToggler'), { ssr: false });
import { useState } from 'react';
import Menu from '../projectComponents/Menu';
import Layout from '../projectComponents/Layout';

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default function Home() {

  return (
    <>
      <Head>
        <title>React-components-lab</title>
        <meta title='author' content='Mohammad Sazzad Bin Anwar' />
        <meta title='description' content='React-components-lab is a collection of React components for web development to do a fast ui development' />
        <meta title='keywords' content="react-components, custom react-ui, custom react-ui-component" />
      </Head>
      <Layout>
        <h1>homepage</h1>
      </Layout>
    </>
  )
}
