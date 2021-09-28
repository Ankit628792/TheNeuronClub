import Head from 'next/head'
import Loader from '../../components/Loader'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { userSession } from '../../lib/user-session'
import { MinusIcon, PlusIcon, ShareIcon, XIcon } from '@heroicons/react/solid'
import Modal from '../../components/Modal'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import Coin from '../../components/Coin'

function QuestionDetail({ questionData }) {
    const session = userSession();
    const [userData, setUserData] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isBidPlaced, setIsBidPlaced] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [lowBalance, setLowBalance] = useState(false)
    const [bid, setBid] = useState(50)
    const [bidData, setBidData] = useState({
        Volume: questionData?.Volume,
        Favour: questionData?.Favour,
        Against: questionData?.Against,
    })
    const [odd, setOdd] = useState('Favour')
    const [isShare, setIsShare] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [que, setQue] = useState(questionData);
    const urlSrc = `https://neuron-club.vercel.app/question/${que?._id}&description=${que?.question}`

    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        const response = await res.json();
        setUserData(response)
    }
    useEffect(() => {
        getUser();
    }, [que])

    let { Volume, Favour, Against } = bidData
    const handleBet = async () => {
        if (userData) {
            setIsActive(false)
            setIsSending(true)
            const { username, balance } = userData;
            if (balance > 0 && balance >= bid) {
                Volume = Volume + bid
                odd == 'Favour' ? Favour = Favour + bid : Against = Against + bid;

                const { _id, question, category, settlementClosing } = que
                const res = await fetch(`/api/transaction/question`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, bid, _id, question, category, odd, settlementClosing })
                })
                console.log(res.status)
                const response = await res.json();
                if (res.status == 201) {
                    setIsBidPlaced(true)
                    setQue(response)
                    setBidData({
                        Volume: response?.Volume,
                        Favour: response?.Favour,
                        Against: response?.Against
                    })
                }
            }
            else {
                setLowBalance(true)
            }
            setIsSending(false)
        }
        else {
            setIsLoggedIn(true)
        }
    }

    function DESC() {
        return { __html: que?.desc };
    }
    return (
        <>
            <Head>
                <title>Question: {que?.question}</title>
            </Head>
            <div className="pt-28 pb-10">
                {
                    que && que?.category ?
                        <>
                            <div className="max-w-5xl gradient-shadow mx-auto rounded-lg lg:p-10 text-xl md:text-2xl font-medium mb-2 sm:mb-4 p-5 px-10 sm:flex sm:space-x-4 items-center text-gray-700 relative">
                                <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                                <h1 className="my-3 sm:my-0 sm:pr-6"> {que?.question} </h1>
                                <div className="absolute top-5 right-6 sm:top-1/2 sm:transform sm:-translate-y-1/2 sm sm:right-5">
                                    {!isShare ?
                                        <ShareIcon title="Share this Question" className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700 cursor-pointer transform -translate-x-2" onClick={() => setIsShare(true)} />
                                        : <div className="w-12 h-auto flex flex-col items-center justify-center space-y-2">
                                            <XIcon className="w-10 h-10 bg-white cursor-pointer rounded-full p-1 text-gray-700" onClick={() => setIsShare(false)} />
                                            <FacebookShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                                                <FacebookIcon size={40} round={true} />
                                            </FacebookShareButton>
                                            <TwitterShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                                                <TwitterIcon size={40} round={true} />
                                            </TwitterShareButton>
                                            <WhatsappShareButton url={urlSrc} className="w-10 h-10 shadow-md rounded-full">
                                                <WhatsappIcon size={40} round={true} />
                                            </WhatsappShareButton>
                                            <a href={`https://www.pinterest.com/pin/create/button/?url=${urlSrc}&description=${que?.question}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
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

                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="max-w-5xl gradient-shadow mx-auto rounded-lg p-5 lg:p-10">
                                <div className="flex flex-col-reverse md:flex-row w-full bet text-lg justify-around">
                                    <div className="bet__container">
                                        <div>
                                            <input type="radio" value="Favour" id="Favour" className="hidden"
                                                onChange={(e) => setOdd(e.target.value)} name="odd" />
                                            <label htmlFor="Favour" className={`px-6 py-3 leading-loose text-gray-800 hover:text-white hover:gradient-bg hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Favour' && 'gradient-bg text-white'} cursor-pointer`}>Yes</label>

                                            <input type="radio" value="Against" id="Against" className="hidden"
                                                onChange={(e) => setOdd(e.target.value)} name="odd" />
                                            <label htmlFor="Against" className={`px-6 py-3 leading-loose text-gray-800 hover:text-white hover:gradient-bg hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Against' && 'gradient-bg text-white'} cursor-pointer`}>No</label>
                                        </div>
                                        <div className="my-4 flex flex-col items-center">
                                            <h1 className="font-medium">Balance : <span className="text-blue-600 inline-flex items-center"><Coin width="4" height="4" />{userData?.balance}</span> </h1>
                                            <h1 className="font-medium">Amount to Bid : <span className="text-blue-600 inline-flex items-center"><Coin width="4" height="4" />{bid}</span> </h1>
                                            <div className="relative flex items-center space-x-4 mt-4">
                                                <MinusIcon className="w-7 h-7 p-1 font-semibold bg-gray-800 text-white rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid > 50 && setBid(bid - 50); setLowBalance(false) }} />
                                                <input type="number" min="1" minLength="1" maxLength="1000" max="1000" value={bid} onChange={(e) => { setBid(e.target.value); setLowBalance(false) }} className="border border-gray-600 font-semibold text-blue-500 text-center rounded focus:outline-none" />
                                                <PlusIcon className="w-7 h-7 p-1 font-semibold bg-gray-800 text-white rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid < 951 && setBid(+bid + +50); setLowBalance(false) }} />
                                            </div>
                                        </div>
                                        {isSending ? <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]">{'Wait...'}</button>
                                            : <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => bid > 0 && setIsActive(true)}>{'Apply Bid'}</button>
                                        }
                                        {bid > 0 === 'false' && <p className="text-red-500 text-base mb-4"> Bid amount is low </p>}
                                        {lowBalance && <p className="text-red-500 text-base mb-4"> Not enough balance to bet </p>}
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>% Bet {`in ${odd}`}</td>
                                                    <td>{Volume > 0 ? (odd == 'Favour') ? (Favour * 100 / Volume).toFixed(2) : (Against * 100 / Volume).toFixed(2) : 0}%</td>
                                                </tr>
                                                <tr>
                                                    <td>Amount {`in ${odd}`}</td>
                                                    <td className="inline-flex items-center">
                                                        <div className="flex items-center">
                                                            <Coin width="4" height="4" />{odd == 'Favour' ? Favour : Against}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Likely earnings</td>
                                                    <td className="inline-flex items-center">
                                                        <div className="flex items-center">
                                                            <Coin width="4" height="4" />{Volume > 0 ? (odd == 'Favour') ? ((bid) * Volume / (Favour + bid)).toFixed(2) : ((bid) * Volume / (Against + bid)).toFixed(2) : bid}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bet__container">
                                        <table className="min-h-[250px]">
                                            <tbody>
                                                <tr>
                                                    <td>Volume</td>
                                                    <td>
                                                        <div className="flex items-center">
                                                            <Coin width="4" height="4" />{Volume}
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Open Date &amp; Time</td>
                                                    <td>{moment(que?.createdAt).format('lll')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Date &amp; Time</td>
                                                    <td>{moment(que?.bidClosing).format('lll')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Settlement Date &amp; Time</td>
                                                    <td>{moment(que?.settlementClosing).format('lll')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Creator</td>
                                                    <td>{que?.userId}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                <div className="p-5">
                                    <h1 className="text-2xl font-semibold my-2">About the question</h1>
                                    <div className="sm:text-lg" dangerouslySetInnerHTML={DESC()}>
                                    </div>
                                </div>
                                {que?.reference && <div className="px-5 pb-10">
                                    <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                                    <div className="sm:text-lg" >
                                        <a href={que?.reference} className="my-2 text-blue-500 block" target="_blank" noreferer="true">{que?.reference}</a>
                                    </div>
                                </div>}
                            </div>
                        </>
                        :
                        <Loader />
                }
            </div>
            {isActive && <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full grid place-items-center z-50" >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 bg-white rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium text-gray-800 z-50 leading-tight">
                        Please confirm that you want to place a bid of <div className="flex items-center justify-center">
                            <Coin width="4" height="4" />{bid}
                        </div>
                    </h1>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-800 border border-gray-900 hover:bg-gray-800 hover:text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsActive(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleBet}>{'Place Bid'}</button>
                    </div>
                </div>
            </div>}
            {isBidPlaced && <div onClick={() => setIsBidPlaced(false)} ><Modal state={isBidPlaced} text="Bid Placed Successfully" /> </div>}
            {isLoggedIn && <div onClick={() => setIsLoggedIn(false)}><Modal state={isLoggedIn} text="Please login to place a bid" /> </div>}

        </>
    )
}

export default QuestionDetail

// export async function getStaticPaths() {
//     const questions = await fetch(`${process.env.HOST}/api/question/get_questions`).then(res => res.json())
//     const data = questions.map(question => {
//         return {
//             params: {
//                 _id: question._id
//             }
//         }

//     })
//     return {
//         paths: data,
//         fallback: true,
//     }

// }

// export async function getStaticProps({ params }) {
//     const questionData = await fetch(`${process.env.HOST}/api/question/${params._id}`).then(res => res.json())
//     if (!questionData) {
//         return {
//             redirect: {
//                 destination: '/page_not_found',
//                 parmanent: false
//             }
//         }
//     }
//     return {
//         props: {
//             questionData
//         }
//     }
// }
