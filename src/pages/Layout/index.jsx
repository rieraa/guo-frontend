import {Fragment, useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom';
import {Popover, Transition} from '@headlessui/react';
import {
    ArrowPathIcon,
    Bars3Icon,
    BookmarkSquareIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorArrowRaysIcon,
    LifebuoyIcon,
    PhoneIcon,
    PlayIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import {getAva, getToken, http} from "../../utils/index.js";
import {Avatar, Dropdown, MessagePlugin} from "tdesign-react";
import {useStore} from "../../store/index.js";

const solutions = [
    {
        name: 'Analytics',
        description:
            'Get a better understanding of where your traffic is coming from.',
        href: '#',
        icon: ChartBarIcon,
    },
    {
        name: 'Engagement',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '#',
        icon: CursorArrowRaysIcon,
    },
    {
        name: 'Security',
        description: "Your customers' data will be safe and secure.",
        href: '#',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Integrations',
        description: "Connect with third-party tools that you're already using.",
        href: '#',
        icon: Squares2X2Icon,
    },
    {
        name: 'Automations',
        description:
            'Build strategic funnels that will drive your customers to convert',
        href: '#',
        icon: ArrowPathIcon,
    },
];
const callsToAction = [
    {name: 'Watch Demo', href: '#', icon: PlayIcon},
    {name: 'Contact Sales', href: '#', icon: PhoneIcon},
];
const resources = [
    {
        name: 'Help Center',
        description:
            'Get all of your questions answered in our forums or contact support.',
        href: '#',
        icon: LifebuoyIcon,
    },
    {
        name: 'Guides',
        description:
            'Learn how to maximize our platform to get the most out of it.',
        href: '#',
        icon: BookmarkSquareIcon,
    },
    {
        name: 'Events',
        description:
            'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },
    {
        name: 'Security',
        description: 'Understand how we take your privacy seriously.',
        href: '#',
        icon: ShieldCheckIcon,
    },
];
//退出登录标签
const logOutOption = () => <div>退出登录</div>;


export default function LayoutPc() {
    const {loginStore} = useStore();
    //下拉菜单选项
    const options = [
        {
            content: logOutOption(),
            value: 1,
        },
    ];

    //头像url
    const [avatarUrl, setAvatarUrl] = useState()
    const [userName, setUserName] = useState()


    //下拉菜单选择退出的回调
    const clickDropLogOut = (data) => {
        loginStore.loginOut()
        location.reload()
    };

    //获取用户信息
    async function getUserinfo() {

        let res = await http.get('/user/userinfo', {
            "token": getToken()
        })
        console.log(res.data)

        if (res.data.avatar == null) {
            console.log("头像为空")
            setAvatarUrl(getAva())
        }
        setAvatarUrl(res.data.avatar)
        setUserName(res.data.username)


        // setAvatarUrl(res.data.avatar);
    }

    useEffect(() => {

        if (getToken()) {
            getUserinfo().then(r => console.log("获取用户信息成功"))
        } else {
            console.log("游客访问")
        }

    }, [])
    return (
        <>
            <Popover className='relative bg-white'>
                <div className='mx-auto px-4 sm:px-6'>
                    <div
                        className='flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
                        <div className='flex justify-start lg:w-0 lg:flex-1'>
                            <Link to='/'>
                                <span className='sr-only'>慕课在线学习平台</span>
                                <img
                                    className='h-8 w-auto sm:h-10'
                                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                    alt=''
                                />
                            </Link>
                        </div>
                        <div className='-my-2 -mr-2 md:hidden'>
                            <Popover.Button
                                className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                <span className='sr-only'>Open menu</span>
                                <Bars3Icon className='h-6 w-6' aria-hidden='true'/>
                            </Popover.Button>
                        </div>
                        <Popover.Group as='nav' className='hidden space-x-10 md:flex'>


                        </Popover.Group>

                        {getToken()
                            ?
                            <div className='flex items-center space-x-3  '>
                                <Dropdown options={options} onClick={clickDropLogOut} >
                                    <Avatar
                                        hideOnLoadFailed={false}
                                        image={avatarUrl}
                                        shape="circle"
                                        size="42px"
                                    />
                                </Dropdown>
                                <p>{userName}</p>
                            </div>

                            :
                            <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
                                <Link
                                    to='/login'
                                    className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
                                    登录
                                </Link>
                                <Link
                                    to='/register'
                                    className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                                    注册
                                </Link>
                            </div>}

                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter='duration-200 ease-out'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='duration-100 ease-in'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'>
                    <Popover.Panel
                        focus
                        className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'>
                        <div
                            className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                            <div className='px-5 pt-5 pb-6'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <img
                                            className='h-8 w-auto'
                                            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                                            alt='Your Company'
                                        />
                                    </div>
                                    <div className='-mr-2'>
                                        <Popover.Button
                                            className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                            <span className='sr-only'>Close menu</span>
                                            <XMarkIcon className='h-6 w-6' aria-hidden='true'/>
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className='mt-6'>

                                </div>
                            </div>

                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
            <Outlet></Outlet>
        </>
    );
}
