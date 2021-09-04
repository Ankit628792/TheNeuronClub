import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MenuAlt1Icon, XIcon } from '@heroicons/react/solid'

function Navbar() {
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false)
    const [isActive, setIsActive] = useState(false)
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
            <div className={`flex items-center justify-between p-5 py-4 fixed w-full z-50 md:px-8 lg:px-14 text-white ${(router.pathname !== '/' || scrolled) && 'gradient-bg gradient-shadow-md'}`}>
                <Link href="/">
                <h1 className="text-3xl lg:text-4xl font-bold cursor-pointer">LOGO.</h1>
                </Link>
                <div className="flex items-center">
                    <ul className="flex hidden md:block space-x-5 pr-6 font-medium text-lg">
                        <Link href="/">Markets</Link>
                        <Link href="/subscribe">My Portfolio</Link>
                        <Link href="/how_it_works">How it Works</Link>
                        <Link href="/faq">FAQs</Link>
                        <Link href="/contact">Contact Us</Link>
                    </ul>
                    <Link href="/subscribe">
                        <button className="btn">Subscribe</button>
                    </Link>
                    <MenuAlt1Icon className="w-10 h-10 ml-3 cursor-pointer md:hidden active:scale-95 transition-sm" onClick={() => setIsActive(true)} />
                </div>
            </div>

            {isActive &&
                <div className="fixed md:hidden z-50 bg-white top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
                    <XIcon className="h-10 w-10 md:hidden absolute top-4 right-5 cursor-pointer active:scale-95 transition-sm" onClick={() => setIsActive(false)} />
                    <ul className="flex flex-col justify-center items-center text-3xl font-bold space-y-4">
                        <Link href="/">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm">Home</h1>
                        </Link>
                        <Link href="/about_us">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm">About us</h1>
                        </Link>
                        <Link href="/how_it_works">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm">How it Works</h1>
                        </Link>
                        <Link href="/contact">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm">Contact us</h1>
                        </Link>
                        <Link href="/subscribe">
                            <h1 className="text-gray-700 hover:text-blue-500 cursor-pointer transition-sm">Subscribe</h1>
                        </Link>
                    </ul>
                </div>
            }
        </>
    )
}

export default Navbar
