import { useState } from 'react';
import Image from 'next/image';
import DarkModeToggler from './DarkModeToggler';
import ExampleCode from '../pages/documentation/example';
import { BsFillMenuButtonWideFill, BsFillMenuAppFill } from 'react-icons/bs'
import { Affix, Menu } from 'antd'
import { RiDashboardLine } from 'react-icons/ri'
import { BiCategory } from 'react-icons/bi'

const { SubMenu } = Menu;

function AntSideBar({ collapsed }) {

    return (

        <div className={`${collapsed ? "w-auto" : "w-80"} normal-transition`}>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                // theme="dark"
                inlineCollapsed={collapsed}
            >
                <Menu.Item key="1" icon={<RiDashboardLine size={20} />} >
                    <p className='text-lg'>Dashboard</p>
                </Menu.Item>
                <SubMenu key="sub1" icon={<BiCategory size={20} />} title={<p className='text-lg'>Category</p>}>
                    <Menu.Item key="5" className='text-base'>Category 5</Menu.Item>
                    <Menu.Item key="6" className='text-base'>Category 6</Menu.Item>
                    <Menu.Item key="7" className='text-base'>Category 7</Menu.Item>
                    <Menu.Item key="8" className='text-base'>Category 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<BiCategory size={20} />} title={<p className='text-lg'>Navigation</p>}>
                    <Menu.Item key="9" className='text-base'>Option 9</Menu.Item>
                    <Menu.Item key="10" className='text-base'>Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu" className='dark:text-white text-lg'>
                        <Menu.Item key="11" className='text-base'>Option 11</Menu.Item>
                        <Menu.Item key="12" className='text-base'>Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        </div>
    )
}


export default function Sidebar() {

    const [showSidebar, setShowSidebar] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    let menulist = [
        {
            name: 'Home',
            link: '/admin-panel-sidebar/example',
            id: 'home',
            icon: '<PieChartOutlined />',
            hasChildren: false,
        },
        {
            name: 'Category',
            hasChildren: true,
            icon: 'BiCategory',
            id: 'category',
            icon: '<PieChartOutlined />',
            children: [
                {
                    name: 'Category - 1',
                    link: '/admin-panel-sidebar/example/category/1',
                    id: 'category-1',
                },
                {
                    name: 'Category - 2',
                    link: '/admin-panel-sidebar/example/category/2',
                    id: 'category-2',
                }
            ]
        },
        {
            name: 'Product',
            hasChildren: true,
            id: 'product',
            icon: 'BiCategory',
            children: [
                {
                    name: 'Product - 1',
                    link: '/admin-panel-sidebar/example/product/1',
                    id: 'product-1',
                },
                {
                    name: 'Product - 2',
                    link: '/admin-panel-sidebar/example/product/2',
                    id: 'product-2',
                }
            ]
        },

    ]

    return (
        <>

            <div className='flex w-full items-start dark:bg-gray-800 bg-gray-100'>
                <Affix>
                    <div className='flex justify-center items-center'>
                        <Image src={'https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} className="normal-transition" height={60} width={collapsed ? 80 : 320} objectFit={collapsed ? "contain" : "cover"} alt="logo" />
                    </div>
                    <AntSideBar collapsed={collapsed} />
                </Affix>
                <div className="normal-transition w-full">
                    <header className='border-b py-2.5 min-w-full sticky top-0 dark:border-b-gray-900 border-b-gray-300 bg-gray-100 dark:bg-gray-900 z-20 normal-transition'>
                        <div className={'flex justify-between items-center container mx-auto'}>
                            <div className='flex items-center text-2xl normal-transition font-nunito w-auto py-0 font-extrabold purple-text'>

                                <button onClick={() => { setShowSidebar(!showSidebar); setCollapsed(!collapsed) }} className='rounded-md cursor-pointer active:scale-90 scale-100 normal-transition p-2 bg-gray-300 dark:bg-gray-600'>
                                    {showSidebar ? <BsFillMenuButtonWideFill className='text-2xl text-black dark:text-white active:rotate-[360deg] normal-transition' /> : <BsFillMenuAppFill className='text-2xl text-black dark:text-white active:rotate-[360deg] normal-transition' />}
                                </button>
                            </div>
                            <div className='flex items-center'>
                                <DarkModeToggler className='mr-auto' />
                            </div>
                        </div>
                    </header>
                    <main className="normal-transition ml-auto ">
                        <ExampleCode />
                    </main>
                </div>
            </div>

        </>
    )
}
