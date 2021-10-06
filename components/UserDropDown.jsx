import { useState, useEffect } from 'react'
import { BellIcon, BriefcaseIcon, CashIcon, ChevronDownIcon, ChevronUpIcon, LogoutIcon, ShareIcon, UserIcon, XIcon } from "@heroicons/react/solid"
import Router from 'next/router'
import { FacebookShareButton, LinkedinShareButton, RedditShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { useDispatch } from 'react-redux'
import { updateBalance } from '../slices/userBalance';
import { useSelector } from 'react-redux'
import { balance } from '../slices/userBalance';
import Coin from './Coin';
import Carousel from './Carousel';
import OnBoarding from './OnBoarding'

function UserDropDown({ session }) {
    const [userData, setUserData] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [isShare, setIsShare] = useState(false)
    const dispatch = useDispatch();
    const amount = useSelector(balance)
    const urlSrc = `https://neuron-club.vercel.app/account/register`

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [isActive]);

    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        console.log(res.status)
        if (res.status == 200) {
            const response = await res.json();
            setUserData(response)
            dispatch(updateBalance(response?.balance))
        }
    }
    useEffect(() => {
        getUser();
    }, []);


    const logout = async () => {
        window.localStorage.setItem('neuron-token', '');
        const res = await fetch(`/api/account/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(session?._id)
        });
        if (res.status === 200) {
            location.reload();
        }
    }
    const [onBoard, setonBoard] = useState(false)
    const [carousel, setcarousel] = useState(false)

    const closeOnboard = () => {
        setcarousel(false);
        setonBoard(false);
    }

    return (
        <>
            {carousel && <Carousel onSelect={closeOnboard} />}
            {onBoard && <OnBoarding onSelect={closeOnboard} />}
            {amount && <span className="inline-flex mr-2 items-center font-medium text-lg"><Coin width="4" height="4" />{amount}</span>}
            <div className="relative font-medium">

                <div className="flex items-center p-1 bg-white rounded-full cursor-pointer text-blue-400" onClick={() => setIsActive(!isActive)}>
                    <div className="MuiAvatar-root MuiAvatar-circle gradient-bg text-white capitalize">{session?.username?.[0]}</div>
                    {isActive ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                </div>
                {isActive && <div className="bg-white gradient-shadow-md absolute min-w-max rounded-md p-3 top-[130%] left-1/2 transform -translate-x-1/2">
                    <ul className="space-y-4 text-lg text-gray-500">
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => Router.push('/account/')}><UserIcon className="w-6 h-6 mr-1 text-gray-700" />Portfolio</li>
                        {/* <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center"><BellIcon className="w-6 h-6 mr-1 text-gray-700" />Notifications</li> */}
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center sm:hidden"><BriefcaseIcon className="w-6 h-6 mr-1 text-gray-700" /> <span className="inline-flex items-center"><Coin width="4" height="4" />{amount}</span></li>
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => setIsShare(true)}><ShareIcon className="w-6 h-6 mr-1 text-gray-700" />Invite a Friend</li>
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => setonBoard(true)}><CashIcon className="w-6 h-6 mr-1 text-gray-700" /> OnBoard One</li>
                        <li className="hover:text-gray-900 cursor-pointer transition-sm flex items-center" onClick={() => setcarousel(true)}><CashIcon className="w-6 h-6 mr-1 text-gray-700" /> OnBoard Two</li>
                        <li onClick={logout} className="hover:text-gray-900 cursor-pointer transition-sm flex items-center"><LogoutIcon className="w-6 h-6 mr-1 text-gray-700" />Logout </li>
                    </ul>
                    <div className="bg-white absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-5 clip-path-sm"></div>
                </div>
                }
            </div>

            {isShare && <div className="share__icons rounded-tl-2xl rounded-bl-2xl h-auto p-4 lg:pr-8 flex flex-col items-center justify-center space-y-2 gradient-shadow-md">
                <XIcon className="w-10 h-10 bg-white cursor-pointer rounded-full p-1 text-gray-700 transform active:rotate-180" onClick={() => setIsShare(false)} />
                <FacebookShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>
                <TwitterShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
                <a href={`https://www.pinterest.com/pin/create/button/?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                    <PinterestIcon size={40} round={true} />
                </a>
                <TelegramShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                    <TelegramIcon size={40} round={true} />
                </TelegramShareButton>
                <RedditShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                    <RedditIcon size={40} round={true} />
                </RedditShareButton>
                <LinkedinShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                    <LinkedinIcon size={40} round={true} />
                </LinkedinShareButton>
            </div>}
        </>
    )
}

export default UserDropDown