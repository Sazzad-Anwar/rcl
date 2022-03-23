import { useState } from 'react';
import Image from 'next/image';
import DarkModeToggler from './DarkModeToggler';
import ExampleCode from '../pages/documentation/example';
import { BsFillMenuButtonWideFill, BsFillMenuAppFill } from 'react-icons/bs'
import { Affix, Menu } from 'antd'
import { RiDashboardLine } from 'react-icons/ri'
import { BiCategory } from 'react-icons/bi'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'

const { SubMenu } = Menu;

const SideBar = ({ collapsed, menulist }) => {

    return (

        <div className={`${collapsed ? "w-auto" : "w-80"} normal-transition h-full`}>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                // theme="dark"
                inlineCollapsed={collapsed}
            >
                {menulist.map(menu => {
                    if (menu.hasSubMenu) {
                        return (
                            <SubMenu key={menu.id} icon={menu.icon} title={<p className='text-lg'>{menu.name}</p>}>
                                {menu.subMenu.map(subMenu => {
                                    if (subMenu.hasSubMenu) {
                                        return (
                                            <SubMenu className='dark:text-white' key={subMenu.id} title={<p className='text-lg'>{subMenu.name}</p>}>
                                                {subMenu.subMenu.map(subSubMenu => {
                                                    if (subSubMenu.hasSubMenu) {
                                                        return (
                                                            <SubMenu className='dark:text-white' key={subSubMenu.id} title={<p className='text-lg'>{subSubMenu.name}</p>}>
                                                                {subSubMenu.subMenu.map(subSubSubMenu => (
                                                                    <Menu.Item key={subSubSubMenu.id} className='text-base'>{subSubSubMenu.name}</Menu.Item>
                                                                ))}
                                                            </SubMenu>
                                                        )
                                                    } else {
                                                        return <Menu.Item key={subSubSubMenu.id} className='text-base'>
                                                            {subSubSubMenu.name}
                                                        </Menu.Item>
                                                    }
                                                })}
                                            </SubMenu>
                                        )
                                    } else {
                                        return <Menu.Item key={subMenu.id} className='text-base'>{subMenu.name}</Menu.Item>
                                    }
                                })}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key="1" icon={<RiDashboardLine size={20} />} >
                                <p className='text-lg'>Dashboard</p>
                            </Menu.Item>
                        )
                    }
                })}
            </Menu>
        </div>
    )
}


const Header = ({ setShowSidebar, showSidebar }) => {
    return (
        <header className='border-b py-2.5 h-16 min-w-full sticky top-0 dark:border-b-gray-900 border-b-gray-300 bg-gray-100 dark:bg-gray-900 z-20 normal-transition'>
            <div className={'flex justify-between items-center container mx-auto'}>
                <div className='flex items-center text-2xl normal-transition font-nunito w-auto py-0 font-extrabold purple-text'>
                    <button onClick={() => { setShowSidebar(!showSidebar) }} className='rounded-md absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer active:scale-90 scale-100 normal-transition p-2 bg-gray-300 dark:bg-gray-600'>
                        {showSidebar ? <BsFillMenuButtonWideFill className='text-2xl text-black dark:text-white active:rotate-[360deg] normal-transition' /> : <BsFillMenuAppFill className='text-2xl text-black dark:text-white active:rotate-[360deg] normal-transition' />}
                    </button>
                </div>
                <div className='flex items-center'>
                    <DarkModeToggler className='mr-auto' />
                </div>
            </div>
        </header>
    )
}


export default function AdminLayout() {

    const [showSidebar, setShowSidebar] = useState(true);

    let menulist = [
        {
            name: 'Home',
            link: '/admin-panel-sidebar/example',
            id: 'home',
            icon: <RiDashboardLine size={20} />,
            hasSubMenu: false,
        },
        {
            name: 'Category',
            hasSubMenu: true,
            icon: 'BiCategory',
            id: 'category',
            icon: <BiCategory size={20} />,
            subMenu: [
                {
                    name: 'Category-1',
                    link: '/admin-panel-sidebar/example/category/1',
                    id: 'category-1',
                    hasSubMenu: true,
                    subMenu: [
                        {
                            name: 'Category-1-1',
                            link: '/admin-panel-sidebar/example/category/1',
                            id: 'category-1-1',
                            hasSubMenu: true,
                            subMenu: [
                                {
                                    name: 'Category-1-1-1',
                                    link: '/admin-panel-sidebar/example/category/1',
                                    id: 'category-1-2',
                                    hasSubMenu: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Category - 2',
                    link: '/admin-panel-sidebar/example/category/2',
                    id: 'category-2',
                    hasSubMenu: false,
                }
            ]
        },
    ]

    return (
        <div className='flex w-full items-start dark:bg-gray-800 bg-gray-100'>
            <Affix>
                <div className='flex justify-center items-center'>
                    <Image src={'https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} className="normal-transition" height={60} width={showSidebar ? 80 : 320} objectFit={showSidebar ? "contain" : "cover"} alt="logo" />
                </div>
                <SideBar collapsed={showSidebar} menulist={menulist} />
            </Affix>
            <div className="normal-transition w-full">
                <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
                <main className="normal-transition ml-auto ">
                    <ExampleCode />
                </main>
            </div>
        </div>
    )
}

