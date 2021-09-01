import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect} from 'react'

function Navbar() {
    const router = useRouter();

    const [scrolled, setScrolled] = useState(false)
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
        <div className={`flex items-center justify-between p-5 py-4 fixed w-full z-50 md:px-8 lg:px-14 text-white ${(router.pathname !=='/' || scrolled) && 'gradient-bg gradient-shadow-md'}`}>
            <h1 className="text-3xl lg:text-4xl font-bold">LOGO.</h1>
            <div className="flex items-center">
                <ul className="flex hidden md:block space-x-5 pr-6 font-medium text-lg">
                    <Link href="/">Markets</Link>
                    <Link href="/">My Portfolio</Link>
                    <Link href="/how_it_works">How it Works</Link>
                    <Link href="/faq">FAQs</Link>
                    <Link href="/contact">Contact Us</Link>
                </ul>
                <Link href="/register">

                <button className="btn">Register</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
