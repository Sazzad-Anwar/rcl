import { useState } from "react";
import DarkModeToggler from "./DarkModeToggler";
import { BsFillMenuButtonWideFill, BsFillMenuAppFill } from "react-icons/bs";
import { Affix, Menu } from "antd";
import { RiDashboardLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { VscAccount } from 'react-icons/vsc';
import Image from "next/image";
import Link from "next/link";

const { SubMenu } = Menu;

const SideBar = ({ collapsed, menulist, admin }) => {
    return (
        <div
            className={`${collapsed ? "w-auto" : "w-80"} normal-transition h-screen`}
        >
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                inlineCollapsed={collapsed}
                className="h-full relative"
            >
                {menulist.map((menu) => {
                    if (menu.hasSubMenu) {
                        return (
                            <SubMenu
                                key={menu.id}
                                icon={menu.icon}
                                title={<p className="text-lg">{menu.name}</p>}
                            >
                                {menu.subMenu.map((subMenu) => {
                                    if (subMenu.hasSubMenu) {
                                        return (
                                            <SubMenu
                                                className="dark:text-white"
                                                key={subMenu.id}
                                                title={<p className="text-lg">{subMenu.name}</p>}
                                            >
                                                {subMenu.subMenu.map((subSubMenu) => {
                                                    if (subSubMenu.hasSubMenu) {
                                                        return (
                                                            <SubMenu
                                                                className="dark:text-white"
                                                                key={subSubMenu.id}
                                                                title={
                                                                    <p className="text-lg">{subSubMenu.name}</p>
                                                                }
                                                            >
                                                                {subSubMenu.subMenu.map((subSubSubMenu) => (
                                                                    <Menu.Item
                                                                        key={subSubSubMenu.id}
                                                                        className="text-base"
                                                                    >
                                                                        {subSubSubMenu.name}
                                                                    </Menu.Item>
                                                                ))}
                                                            </SubMenu>
                                                        );
                                                    } else {
                                                        return (
                                                            <Menu.Item
                                                                key={subSubMenu.id}
                                                                className="text-base"
                                                            >
                                                                {subSubMenu.name}
                                                            </Menu.Item>
                                                        );
                                                    }
                                                })}
                                            </SubMenu>
                                        );
                                    } else {
                                        return (
                                            <Menu.Item key={subMenu.id} className="text-base">
                                                {subMenu.name}
                                            </Menu.Item>
                                        );
                                    }
                                })}
                            </SubMenu>
                        );
                    }
                    else {
                        return (
                            <Menu.Item key="1" icon={<RiDashboardLine size={20} />}>
                                <span className="text-lg">{menu.name}</span>
                            </Menu.Item>
                        );
                    }
                })}

                <Menu.Item className={`absolute bottom-16 w-full ${collapsed ? 'py-0' : 'py-10'}`} icon={<VscAccount size={28} />}>
                    <Link href="/" >
                        <a className="flex flex-col dark:text-white">
                            <span className="text-lg">{admin.name}</span>
                            <span className="text-sm">{admin.email}</span>
                        </a>
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
};

const Header = ({ setShowSidebar, showSidebar }) => {
    return (
        <header className="normal-transition sticky top-0 z-20 h-16 min-w-full border-b border-b-gray-300 bg-gray-100 py-2.5 dark:border-b-gray-900 dark:bg-gray-900">
            <div className="container mx-auto flex h-full items-center justify-between">
                <div className="normal-transition font-nunito purple-text flex w-auto items-center py-0 text-2xl font-extrabold">
                    <button
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                        className="normal-transition absolute top-1/2 left-3 -translate-y-1/2 scale-100 cursor-pointer rounded-md bg-gray-300 p-2 active:scale-90 dark:bg-gray-600"
                    >
                        {showSidebar ? (
                            <BsFillMenuButtonWideFill className="normal-transition text-2xl text-black active:rotate-[360deg] dark:text-white" />
                        ) : (
                            <BsFillMenuAppFill className="normal-transition text-2xl text-black active:rotate-[360deg] dark:text-white" />
                        )}
                    </button>
                </div>
                <div className="flex items-center">
                    <DarkModeToggler className="mr-auto" />
                </div>
            </div>
        </header>
    );
};

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);

    let menulist = [
        {
            name: "Home",
            link: "/",
            id: "home",
            icon: <RiDashboardLine size={30} />,
            hasSubMenu: false,
        },
        {
            name: "Category",
            hasSubMenu: true,
            id: "category",
            icon: <BiCategory size={20} />,
            subMenu: [
                {
                    name: "Category-1",
                    link: "/admin-panel-sidebar/example/category/1",
                    id: "category-1",
                    hasSubMenu: true,
                    subMenu: [
                        {
                            name: "Category-1-1",
                            link: "/admin-panel-sidebar/example/category/1",
                            id: "category-1-1",
                            hasSubMenu: false,
                        },
                    ],
                },
                {
                    name: "Category - 2",
                    link: "/admin-panel-sidebar/example/category/2",
                    id: "category-2",
                    hasSubMenu: false,
                },
            ],
        },
    ];

    let admin = {
        name: "Admin",
        link: '/',
        image: "https://i.pravatar.cc/300",
        email: 'admin@mail.com'
    }

    return (
        <div className="flex w-full items-start bg-gray-100 dark:bg-gray-800">
            <Affix>
                <div className="flex items-center justify-center">
                    <Image
                        src={
                            "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        }
                        height={60}
                        width={collapsed ? 60 : 112}
                        className={
                            collapsed
                                ? "normal-transition rounded-full h-14 w-14"
                                : "normal-transition h-auto w-28"
                        }
                        alt="logo"
                    />
                </div>
                <SideBar collapsed={collapsed} menulist={menulist} admin={admin} />
            </Affix>
            <div className="normal-transition h-screen w-full">
                <Header setShowSidebar={setCollapsed} showSidebar={collapsed} />
                <main className="normal-transition ml-auto overflow-auto">
                    <h1 className="my-5 text-center text-2xl font-medium dark:text-white">
                        Your content goes here
                    </h1>
                </main>
            </div>
        </div>
    );
}
