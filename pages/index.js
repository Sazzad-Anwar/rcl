import Head from 'next/head'
import dynamic from 'next/dynamic';
import Layout from '../projectComponents/Layout';
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default function Home() {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>React-components-lab</title>
        <meta title='author' content='Mohammad Sazzad Bin Anwar' />
        <meta title='description' content='React-components-lab is a collection of React components for web development to do a fast ui development' />
        <meta title='keywords' content="react-components, custom react-ui, custom react-ui-component" />
      </Head>
      <Layout>
        <h1 className='text-2xl font-extrabold font-nunito dark:text-white'>React Components Lab</h1>
        <p className='text-lg font-medium font-nunito dark:text-gray-100 mt-5'>
          React components lab is a collection of React components based on <a href="https://tailwindcss.com/" className='underline-offset-1 underline'><i><b>Tailwind CSS</b></i></a> for web development to do a fast ui development. To utilize these component you must need to use latest version of tailwind css configuration. Each components has some <a href="https://www.npmjs.com/" className='underline-offset-1 underline'><i><b>NPM</b></i></a> dependencies. You will find the all instruction to install the npm packages and an example of how to use the component in your project. The components have been made focused on <i><b>Next.js</b></i>. You can modify and use it for <i><b>React</b></i>.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 md:gap-5 mt-10'>
          <div
            onClick={() => router.push('/dark-mode-toggler')}
            className='w-full h-96 cursor-pointer active:scale-90 scale-100 shadow-lg rounded-lg hover:shadow-2xl normal-transition border dark:border-gray-700'
          >
            <div className='flex justify-center items-center h-80 w-full dark:bg-gray-700 bg-gray-300' />
            <h1 className='text-2xl mt-4 text-center font-extrabold font-nunito purple-text'>Dark mode toggler</h1>
          </div>

          <div
            onClick={() => router.push('/documentation')}
            className='w-full h-96 cursor-pointer active:scale-90 scale-100 shadow-lg rounded-lg hover:shadow-2xl normal-transition border dark:border-gray-700'
          >
            <div className='flex justify-center items-center h-80 w-full dark:bg-gray-700 bg-gray-300' />
            <h1 className='mt-4 text-2xl text-center font-extrabold font-nunito purple-text'>React rest api documentation</h1>
          </div>

        </div>
      </Layout>
    </>
  )
}
