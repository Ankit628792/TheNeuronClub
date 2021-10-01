import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid'
import { userSession } from '../lib/user-session'
import UserDropDown from './UserDropDown'

function Navbar() {
    const router = useRouter();
    const session = userSession();
    const [scrolled, setScrolled] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const logout = async () => {
        window.localStorage.setItem('neuron-token', '');
        const res = await fetch(`/api/account/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session._id)
        });
        if (res.status === 200) {
            location.reload();
        }
    }

    const checkScrollTop = () => {
        if (window.pageYOffset > 75) {
            setScrolled(true)
        } else if (window.pageYOffset <= 75) {
            setScrolled(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    }, [scrolled])

    return (
        <>
            <div className={`flex items-center justify-between p-5 py-4 fixed w-full z-50 md:px-8 md:pr-14 lg:px-14 text-white ${(router.pathname !== '/' || scrolled) && 'gradient-bg gradient-shadow-md'}`}>
                <Link href="/">
                    <div className="relative h-12 w-48 cursor-pointer">
                        <Image src="/images/logo.png" layout="fill" objectFit="contain" className="drop-shadow-md overflow-hidden" />
                    </div>
                </Link>
                <div className="flex items-center">
                    <ul className="flex hidden md:block space-x-5 pr-6 font-medium text-lg">
                        <Link href="/question/">Explore</Link>
                        {session && <Link href="/create_question">Create Question</Link>}
                        <Link href="/how_it_works">How it Works</Link>
                        {!session &&
                            <>
                                <Link href="/faq">FAQs</Link>
                                <Link href="/contact">Contact Us</Link>
                            </>
                        }
                    </ul>
                    {
                        session ?
                            <UserDropDown session={session} />
                            :
                            <>
                                <Link href="/account/login" className="hidden lg:inline-block">
                                    <button className="btn hidden lg:inline-block cursor-pointer active:scale-95 transition-sm mr-2">Login</button>
                                </Link>
                                <Link href="/account/register">
                                    <button className="btn hidden md:inline-block cursor-pointer active:scale-95 transition-sm">Get Started</button>
                                </Link>
                            </>
                    }

                    <MenuAlt1Icon className="w-10 h-10 ml-3 cursor-pointer md:hidden active:scale-95 transition-sm" onClick={() => setIsActive(true)} />
                </div>
            </div>

            {isActive &&
                <div className="fixed md:hidden z-50 bg-white top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
                    <XIcon className="h-10 w-10 md:hidden absolute top-4 right-5 cursor-pointer active:scale-95 transition-sm" onClick={() => setIsActive(false)} />
                    <ul className="flex flex-col justify-center items-center text-3xl font-bold space-y-5">
                        <Link href="/question/">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Explore</h1>
                        </Link>
                        {session &&
                            <Link href="/account/">
                                <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Portfolio</h1>
                            </Link>
                        }
                        {session &&
                            <Link href="/create_question">
                                <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Create Question</h1>
                            </Link>
                        }
                        <Link href="/how_it_works">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >How it Works</h1>
                        </Link>
                        <Link href="/contact">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Contact us</h1>
                        </Link>
                        {
                            session ?
                                <button onClick={logout} className="font-bold" > <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Logout</h1> </button>

                                :
                                <Link href="/account/register">
                                    <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm" onClick={() => setIsActive(false)} >Register</h1>
                                </Link>
                        }
                    </ul>
                </div>
            }
        </>
    )
}

export default Navbar
