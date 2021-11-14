import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { MinusIcon, PlusIcon, ShareIcon, XIcon } from '@heroicons/react/solid'
import { InformationCircleIcon } from '@heroicons/react/outline'
import Loader from '../../components/Loader'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { userSession } from '../../lib/user-session'
import Modal from '../../components/Modal'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import Coin from '../../components/Coin'
import { balance, updateBalance } from '../../slices/userBalance'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'
import { motion } from 'framer-motion';
import { modules, formats, pageSlide, pageTransition, pageZoom } from '../../util'
import dynamic from 'next/dynamic'
import CommentBox from '../../components/CommentBox';
import Settlement from '../../components/Settlement';
import UserTransaction from '../../components/UserTransaction'
import { EditQue } from '../../components/EditQue'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

function QuestionDetail({ questionData }) {
    const session = userSession();
    const amount = useSelector(balance)
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isBidPlaced, setIsBidPlaced] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [lowBalance, setLowBalance] = useState(false)
    const [bidLimit, setBidLimit] = useState(false)
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
    const [updateQue, setUpdateQue] = useState(questionData);
    const [isQueEdit, setIsQueEdit] = useState(false)
    const [isQue, setIsQue] = useState(null);
    const [isSettle, setIsSettle] = useState(false)
    const [desc, setDesc] = useState(que?.desc)
    const [bidPlaceModal, setBidPlaceModal] = useState(false)
    const yesRef = useRef()
    const noRef = useRef()

    // const urlSrc = `https://neuron-club.vercel.app/question/${que?._id}`
    const urlSrc = `https://www.theneuron.club/question/${que?._id}`


    const getUserInfo = async () => {
        const res = await fetch(`/api/user/info?_id=${questionData?.userId}`)
        if (res.status == 200) {
            const response = await res.json();
            setUserInfo(response)
        }
    }
    useEffect(() => {
        getUserInfo();
    }, [])

    let { Volume, Favour, Against } = bidData
    const handleBet = async () => {
        if (session) {
            setIsActive(false)
            setIsSending(true)
            if (amount > 0 && amount >= bid) {
                Volume = Volume + bid
                odd == 'Favour' ? Favour = Favour + bid : Against = Against + bid;

                const { _id, question, category, settlementClosing } = que
                const res = await fetch(`/api/transaction/question`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bid, _id, userId: session?._id, question, category, odd, settlementClosing })
                })
                console.log(res.status)
                const response = await res.json();
                if (res.status == 201 || res.status == 203) {
                    dispatch(updateBalance(amount - response?.reductionAmount))
                    setIsBidPlaced(true)
                    setQue(response?._doc)
                    setBidData({
                        Volume: response?._doc?.Volume,
                        Favour: response?._doc?.Favour,
                        Against: response?._doc?.Against
                    })
                    if (res.status === 203) {
                        toast("You've won 200 Neuron coins for this transaction! 🥳", {
                            position: "top-center",
                            autoClose: 20000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
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

    const validate = () => {
        if (que.qstatus === 'verified' && que.bidClosing > new Date().toISOString()) {
            if (bid > 0 && bid <= 1000) {
                if (que.qstatus == 'verified') {
                    (session) ? setIsActive(true) : setIsLoggedIn(true)
                }
            } else {
                setBidLimit(true)
            }
        }
    }

    const handleChange = (e) => {
        setUpdateQue({ ...updateQue, [e.target.name]: e.target.value });
    }

    const setQuestionStatus = () => {
        setUpdateQue({ ...updateQue, qstatus: (updateQue.qstatus === 'verified') ? 'closed' : 'verified' });
    }

    const [bidClosingDate, setBidClosingDate] = useState(new Date(que?.bidClosing))
    const [settlementClosingDate, setSettlementClosingDate] = useState(new Date(que?.settlementClosing))

    const updateQuestion = async () => {
        const { _id, qstatus, question } = updateQue;
        const res = await fetch(`/api/question/update_que`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id, bidClosing: bidClosingDate, settlementClosing: settlementClosingDate, desc, qstatus, question })
        })
        console.log(res.status)
        const response = await res.json();
        if (res.status == 200) {
            setIsQueEdit(false);
            setQue(response)
        }
    }

    const checkBid = (e) => {
        setBid(e.target.value);
        setLowBalance(false)
        if (e.target.value < 1 || e.target.value > 1000) {
            setBidLimit(true)
        } else {
            setBidLimit(false)
        }
    }

    const updateQues = async (updatedQuestion) => {
        setQue(updatedQuestion)
    }

    function DESC() {
        return { __html: que?.desc };
    }

    return (
        <>
            <Head>
                <title>Question: {que?.question}</title>
            </Head>
            <ToastContainer />
            <div className="py-10 relative">
                {isQue && <EditQue queData={isQue} setIsQue={setIsQue} updateQues={updateQues} from="queDetail" />}
                {
                    que && que?.category ?
                        <>
                            <div className="max-w-7xl mx-auto">

                                <div className="md:min-h-[500px] w-full flex items-center flex-col lg:flex-row p-10 lg:pb-20 justify-between">

                                    <motion.div
                                        initial={{ opacity: 0, translateX: '-400px' }}
                                        animate={{ opacity: 1, translateX: '0px' }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 40,
                                        }} className="relative h-72 w-72 sm:h-96 sm:w-96 xl:h-[450px] xl:w-[450px] max-w-md">
                                        <Image src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} className="" objectFit="cover" layout="fill" />
                                        <div className="text-white bg-black bg-opacity-40 backdrop-filter backdrop-blur-sm text-xl absolute bottom-0 left-0 w-full p-5 font-medium h-28 hover:h-52 transition-all duration-500 ease-in-out overflow-hidden">
                                            <div className="w-full h-full overflow-hidden leading-relaxed bg-transparent">
                                                <p>Volume: {Volume}</p>
                                                <p>Bid Open at {moment(que?.goLive).format('lll')}</p>
                                                <p>Bid Closing at {moment(que?.bidClosing).format('lll')}</p>
                                                <p>Settlement till {moment(que?.settlementClosing).format('lll')}</p>
                                                <p>Creator: {userInfo?.name || questionData?.userId || 'unKnown'}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, translateX: '400px' }}
                                        animate={{ opacity: 1, translateX: '0px' }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 50,
                                        }} className="text-white max-w-xl sm:p-5 xl:p-0 mt-5 lg:mt-0 text-center lg:text-left">
                                        <h2 className="text-lg md:text-xl text-yellow-300 capitalize">{que?.category}</h2>
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-2">{que.question}</h1>
                                        <h2 className="flex justify-center lg:justify-start items-center divide-x-2 text-lg md:text-xl my-4">
                                            <p className="pr-5 text-yellow-300">{Volume > 0 ? Math.round((Against * 100 / Volume)) : 0}% say no</p>
                                            <p className="pl-5 text-green-300">{Volume > 0 ? Math.round((Favour * 100 / Volume)) : 0}% say yes</p>
                                        </h2>
                                        <div className="flex space-x-3 items-center justify-center lg:justify-start">
                                            {session?.type === 'admin' && <button className="select-none px-4 py-1 mx-auto min-w-[100px] leading-loose btn-orange text-white shadow text-lg rounded-3xl font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none" onClick={() => setIsQue(que)}>Edit</button>
                                            }
                                            {(que?.qstatus === 'verified' && que?.bidClosing < new Date().toISOString())
                                                ? <>{session?.type === 'admin' ? <button className={select-none `btn-blue min-w-max px-5 py-2 text-lg font-medium rounded-3xl mr-3 cusor-pointerpointer`} onClick={() => setIsSettle(true)}>Settle This Question</button> : <button className="select-none btn-gray text-gray-500 cursor-not-allowed min-w-max px-5 py-2 text-lg font-medium rounded-3xl mr-3 cusor-pointer">Bidding Closed</button>} </>
                                                : <button className="select-none btn-blue min-w-max px-5 py-2 text-lg font-medium rounded-3xl mr-3 cusor-pointer" onClick={() => setBidPlaceModal(true)}>Place a bid</button>}
                                            <button className="select-none inline-flex min-w-[100px] flex-1 items-center justify-end px-5 py-2 text-lg font-medium rounded-3xl cursor-pointer" onClick={() => setIsShare(true)}>Share <ShareIcon title="Share this Question" className="w-6 h-6 mx-1 sm:w-7 sm:h-7 text-white cursor-pointer" /></button>
                                        </div>
                                    </motion.div>

                                </div>

                                <div className="flex items-start w-full text-white px-5 md:px-10 pb-10 lg:space-x-10">
                                    <div className="flex-1">
                                        {/* <div className="h-96 w-full overflow-x-hidden max-w-4xl blur-black rounded-md p-5" id="chartContainer">
                                        </div> */}
                                        {/* <div className="h-96 w-full max-w-4xl">
                            <img src="https://miro.medium.com/max/1400/1*rom2Ml3yRkKmqvXOns2gcQ.png" className="w-full h-full max-w-4xl object-contain" alt="" />
                        </div> */}

                                        <div className="mb-5 w-full flex flex-wrap items-center justify-evenly gap-x-4 gap-y-8 md:gap-x-8">
                                            <div className="p-5 blur-black rounded-xl text-left max-w-max">
                                                <h1 className="text-gray-400 text-base font-semibold">Bid Open Date & Time </h1>
                                                <h2 className="text-gray-50 text-xl font-medium">{moment(que?.goLive).format('lll')}</h2>
                                            </div>
                                            <div className="p-5 blur-black rounded-xl text-left max-w-max">
                                                <h1 className="text-gray-400 text-base font-semibold">Bid Closing Date & Time </h1>
                                                <h2 className="text-gray-50 text-xl font-medium">{moment(que?.bidClosing).format('lll')}</h2>
                                            </div>
                                            <div className="p-5 blur-black rounded-xl text-left max-w-max">
                                                <h1 className="text-gray-400 text-base font-semibold">Settlement Closing Date & Time </h1>
                                                <h2 className="text-gray-50 text-xl font-medium">{moment(que?.settlementClosing).format('lll')}</h2>
                                            </div>
                                        </div>
                                        {que?.desc && <>
                                            <motion.div initial="initial"
                                                animate="in"
                                                exit="out"
                                                variants={pageSlide}
                                                transition={pageTransition} className="mb-5 blur-black rounded-md p-5 w-full">
                                                <h1 className="text-2xl font-semibold my-2">About the question</h1>
                                                <div className="sm:text-lg que__desc" dangerouslySetInnerHTML={DESC()}></div>
                                            </motion.div>
                                        </>}
                                        {que?.reference && <>
                                            <motion.div initial="initial"
                                                animate="in"
                                                exit="out"
                                                variants={pageSlide}
                                                transition={pageTransition} className="mb-5 blur-black rounded-md p-5 pt-0 w-full">
                                                <>
                                                    <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                                                    <a href={que?.reference} className="my-2 text-blue-500 block text-lg" target="_blank" noreferer="true">{que?.reference}</a>
                                                </>
                                            </motion.div>
                                        </>}

                                        <CommentBox queId={que?._id} userId={session?._id} name={session?.name} image_url={session?.image_url} />

                                    </div>

                                    <div className="min-w-[300px] max-w-3xl hidden lg:inline-block">
                                        <motion.div initial="initial"
                                            animate="in"
                                            exit="out"
                                            variants={pageZoom}
                                            transition={pageTransition} className="bet__container flex flex-col items-center justify-center p-5 blur-black rounded-md">
                                            <div className="flex w-full items-center justify-around">
                                                <input type="radio" value="Favour" id="Favour" className="hidden"
                                                    onChange={(e) => setOdd(e.target.value)} ref={yesRef} name="odd" />
                                                <div onClick={() => yesRef.current.click()} className={`px-6 py-1 inline-block text-center leading-loose blur-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Favour' && 'btn-blue text-white'} cursor-pointer`}>Yes</div>

                                                <input type="radio" value="Against" id="Against" className="hidden"
                                                    onChange={(e) => setOdd(e.target.value)} ref={noRef} name="odd" />
                                                <div onClick={() => noRef.current.click()} className={`px-6 py-1 inline-block text-center leading-loose blur-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Against' && 'btn-blue text-white'} cursor-pointer`}>No</div>
                                            </div>
                                            <div className="my-4 flex flex-col items-center">
                                                <h1 className="font-medium">Amount to Bid : <span className="text-blue-300 inline-flex items-center"><Coin width="4" height="4" />{bid}</span> </h1>
                                                <div className="relative flex items-center space-x-4 mt-4">
                                                    <MinusIcon className="w-7 h-7 p-1 font-semibold bg-gray-100 text-gray-900 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid > 50 && setBid(bid - 50); setLowBalance(false) }} />
                                                    <input type="number" min="1" minLength="1" maxLength="1000" max="1000" value={bid} onChange={checkBid} className="border border-gray-100 font-semibold text-blue-500 text-center rounded focus:outline-none" />
                                                    <PlusIcon className="w-7 h-7 p-1 font-semibold bg-gray-100 text-gray-900 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid < 951 && setBid(+bid + +50); setLowBalance(false) }} />
                                                </div>
                                            </div>
                                            {isSending ? <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]">{'Wait...'}</button>
                                                : <button className={`px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] disabled:text-gray-800 disabled:cursor-not-allowed ${que.qstatus === 'verified' && que.bidClosing > new Date().toISOString() ? 'btn-blue' : 'bg-gray-300 text-gray-500'}`} onClick={validate} disabled={que.qstatus !== 'verified' && que.bidClosing < new Date().toISOString()}>{que?.qstatus === 'closed' ? 'Bidding Closed' : 'Apply Bid'}</button>
                                            }
                                            {bid > 0 === 'false' && <p className="text-red-500 text-base mb-4"> Bid amount is low </p>}
                                            {lowBalance && <p className="text-red-500 text-base mb-4"> Not enough balance to bet </p>}
                                            {bidLimit && <p className="text-red-500 text-base mb-4"> Bid amount should in range of 1-1000 </p>}
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>% Bet {`in ${odd}`}</td>
                                                        <td>{Volume > 0 ? (odd == 'Favour') ? Math.round((Favour * 100 / Volume)) : Math.round((Against * 100 / Volume)) : 0}%</td>
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
                                        </motion.div>
                                        {session && <UserTransaction queId={que?._id} userId={session?._id} />}
                                    </div>
                                </div>

                            </div>
                        </>
                        :
                        <div className="fixed inset-0 w-full h-screen z-50 blur-black flex items-center justify-center max_w_3xl">
                            <Loader />
                        </div>
                }
                {
                    bidPlaceModal &&
                    <div className="fixed inset-0 text-white w-full h-full blur-black z-40">

                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="flex flex-col items-center justify-center p-5 py-7 sm:p-7 md:p-10 blur-blue rounded-md absolute top-1/2 left-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 !z-50">
                            <XIcon className="w-10 h-10 p-1 absolute -top-4 -right-4 bg-white cursor-pointer rounded-full text-gray-700" onClick={() => setBidPlaceModal(false)} />
                            <div className="flex w-full items-center justify-around">
                                <input type="radio" value="Favour" id="Favour" className="hidden"
                                    onChange={(e) => setOdd(e.target.value)} ref={yesRef} name="odd" />
                                <div onClick={() => yesRef.current.click()} className={`px-6 py-1 inline-block text-center leading-loose blur-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Favour' && 'btn-blue text-white'} cursor-pointer`}>Yes</div>

                                <input type="radio" value="Against" id="Against" className="hidden"
                                    onChange={(e) => setOdd(e.target.value)} ref={noRef} name="odd" />
                                <div onClick={() => noRef.current.click()} className={`px-6 py-1 inline-block text-center leading-loose blur-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Against' && 'btn-blue text-white'} cursor-pointer`}>No</div>
                            </div>
                            <div className="my-4 flex flex-col items-center">
                                <h1 className="font-medium">Amount to Bid : <span className="text-blue-300 inline-flex items-center"><Coin width="4" height="4" />{bid}</span> </h1>
                                <div className="relative flex items-center space-x-4 mt-4">
                                    <MinusIcon className="w-7 h-7 p-1 font-semibold bg-gray-100 text-gray-900 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid > 50 && setBid(bid - 50); setLowBalance(false) }} />
                                    <input type="number" min="1" minLength="1" maxLength="1000" max="1000" value={bid} onChange={checkBid} className="border border-gray-100 font-semibold text-blue-500 text-center rounded focus:outline-none" />
                                    <PlusIcon className="w-7 h-7 p-1 font-semibold bg-gray-100 text-gray-900 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid < 951 && setBid(+bid + +50); setLowBalance(false) }} />
                                </div>
                            </div>
                            {isSending ? <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]">{'Wait...'}</button>
                                : <button className={`px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] disabled:text-gray-500 disabled:cursor-not-allowed ${que.qstatus === 'verified' && que.bidClosing > new Date().toISOString() ? 'btn-blue' : 'bg-gray-300 text-gray-500'}`} onClick={validate} disabled={que.qstatus !== 'verified' && que.bidClosing < new Date().toISOString()}>{que?.qstatus === 'closed' ? 'Bidding Closed' : 'Apply Bid'}</button>
                            }
                            {bid > 0 === 'false' && <p className="text-red-500 text-base mb-4"> Bid amount is low </p>}
                            {lowBalance && <p className="text-red-500 text-base mb-4"> Not enough balance to bet </p>}
                            {bidLimit && <p className="text-red-500 text-base mb-4"> Bid amount should in range of 1-1000 </p>}
                            <table>
                                <tbody>
                                    <tr>
                                        <td>% Bet {`in ${odd}`}</td>
                                        <td>{Volume > 0 ? (odd == 'Favour') ? Math.round((Favour * 100 / Volume)) : Math.round((Against * 100 / Volume)) : 0}%</td>
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
                        </motion.div>

                    </div>

                }
                {isShare &&
                    <div className="fixed inset-0 w-full h-screen grid place-items-center z-50 blur-black" onClick={() => setIsShare(false)} >
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="relative max-w-sm md:max-w-md py-10 md:py-12 px-8 blur-gray rounded-xl shadow-2xl m-4 flex items-center justify-center flex-wrap gap-4">
                            <XIcon className="h-8 w-8 md:w-10 md:h-10 absolute top-4 right-4 cursor-pointer active:scale-95 transition-sm text-gray-50" onClick={() => setIsShare(false)} />
                            <h1 className="text-white block w-full text-xl font-semibold">Share this Question </h1>
                            <>
                                {window.innerWidth > 769 ?
                                    <>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <FacebookIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://twitter.com/share?text=${que?.question}&url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <TelegramIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://web.whatsapp.com/send?text=${que?.question}%20${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <WhatsappIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://www.pinterest.com/pin/create/button/?url=${urlSrc}&description=${que?.question}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <PinterestIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://telegram.me/share/url?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <TelegramIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://www.reddit.com/submit?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <RedditIcon size={40} round={true} />
                                        </a>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                            <LinkedinIcon size={40} round={true} />
                                        </a>
                                    </>
                                    :
                                    <>
                                        <FacebookShareButton url={urlSrc} quote={que?.question}>
                                            <FacebookIcon size={40} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={urlSrc} title={que?.question} >
                                            <TwitterIcon size={40} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={urlSrc} separator=" " >
                                            <WhatsappIcon size={40} round={true} />
                                        </WhatsappShareButton>
                                        <PinterestShareButton url={urlSrc} description={que?.question} media={que?.image_url || `https://www.theneuron.club/images/que/${que?.category?.toLowerCase()}.jfif`} >
                                            <PinterestIcon size={40} round={true} />
                                        </PinterestShareButton>
                                        <TelegramShareButton url={urlSrc} title={que?.question} >
                                            <TelegramIcon size={40} round={true} />
                                        </TelegramShareButton>
                                        <RedditShareButton url={urlSrc} title={que?.question} >
                                            <RedditIcon size={40} round={true} />
                                        </RedditShareButton>
                                        <LinkedinShareButton url={urlSrc} title={que?.question} source={urlSrc} >
                                            <LinkedinIcon size={40} round={true} />
                                        </LinkedinShareButton>
                                    </>
                                }
                            </>
                        </motion.div>
                    </div>
                }
                {/* 
                {
                    que && que?.category ?
                        <>
                            <motion.div initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageSlide}
                                transition={pageTransition} className="w-full max-w-5xl blur-black gradient-shadow mx-auto rounded-lg lg:p-10 text-xl md:text-2xl font-medium mb-2 sm:mb-4 p-5 px-10 sm:flex sm:space-x-4 items-center text-gray-50 relative z-10">
                                <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 xl:w-16 xl:h-16 shadow-lg hover:scale-105 transition-md object-cover border-2 border-white rounded-full" />
                                {isQueEdit ? <input
                                    placeholder="Question"
                                    type="text"
                                    name="question"
                                    required
                                    value={updateQue?.question}
                                    onChange={handleChange}
                                    className="w-full flex-1 h-12 px-4 mb-2 transition duration-200 text-gray-900 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                /> : <h1 className="my-3 sm:my-0 flex-1"> {que?.question} </h1>}
                                <div className="w-12 h-12 absolute top-5 right-6 sm:top-0 sm:right-0 sm:relative pt-1 grid place-items-center">
                                    {!isShare ?
                                        <ShareIcon title="Share this Question" className="w-8 h-8 sm:w-10 sm:h-10 text-white cursor-pointer" onClick={() => setIsShare(true)} />
                                        : <motion.div initial="initial"
                                            animate="in"
                                            exit="out"
                                            variants={pageSlide}
                                            transition={pageTransition} className="w-12 h-auto flex flex-col items-center justify-center space-y-2 z-20">
                                            <XIcon className="w-10 h-10 p-1 bg-white cursor-pointer rounded-full text-gray-700" onClick={() => setIsShare(false)} />
                                            <>
                                                {window.innerWidth > 769 ?
                                                    <>
                                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <FacebookIcon size={40} round={true} />
                                                        </a>
                                                        <a href={`https://twitter.com/share?text=${que?.question}&url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <TelegramIcon size={40} round={true} />
                                                        </a>
                                                        <a href={`https://web.whatsapp.com/send?text=${que?.question}%20${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <WhatsappIcon size={40} round={true} />
                                                        </a>
                                                        <a href={`https://www.pinterest.com/pin/create/button/?url=${urlSrc}&description=${que?.question}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <PinterestIcon size={40} round={true} />
                                                        </a>
                                                        <a href={`https://telegram.me/share/url?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <TelegramIcon size={40} round={true} />
                                                        </a>
                                                        <a href={`https://www.reddit.com/submit?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <RedditIcon size={40} round={true} />
                                                        </a>
                                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlSrc}`} target="_blank" noreferer="true" className="w-10 h-10 shadow-md rounded-full">
                                                            <LinkedinIcon size={40} round={true} />
                                                        </a>
                                                    </>
                                                    :
                                                    <>
                                                        <FacebookShareButton url={urlSrc} quote={que?.question}>
                                                            <FacebookIcon size={40} round={true} />
                                                        </FacebookShareButton>
                                                        <TwitterShareButton url={urlSrc} title={que?.question} >
                                                            <TwitterIcon size={40} round={true} />
                                                        </TwitterShareButton>
                                                        <WhatsappShareButton url={urlSrc} separator=" " >
                                                            <WhatsappIcon size={40} round={true} />
                                                        </WhatsappShareButton>
                                                        <PinterestShareButton url={urlSrc} description={que?.question} media={que?.image_url || `https://www.theneuron.club/images/que/${que?.category?.toLowerCase()}.jfif`} >
                                                            <PinterestIcon size={40} round={true} />
                                                        </PinterestShareButton>
                                                        <TelegramShareButton url={urlSrc} title={que?.question} >
                                                            <TelegramIcon size={40} round={true} />
                                                        </TelegramShareButton>
                                                        <RedditShareButton url={urlSrc} title={que?.question} >
                                                            <RedditIcon size={40} round={true} />
                                                        </RedditShareButton>
                                                        <LinkedinShareButton url={urlSrc} title={que?.question} source={urlSrc} >
                                                            <LinkedinIcon size={40} round={true} />
                                                        </LinkedinShareButton>
                                                    </>
                                                }
                                            </>
                                        </motion.div>
                                    }
                                </div>
                            </motion.div>
                            <motion.div initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageSlide}
                                transition={pageTransition} className="max-w-5xl text-white blur-black gradient-shadow mx-auto rounded-lg p-5 lg:p-10">
                                <div className="flex flex-col-reverse md:flex-row w-full bet text-lg justify-around">
                                    <motion.div initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageZoom}
                                        transition={pageTransition} className="bet__container blur-white">
                                        <div>
                                            <input type="radio" value="Favour" id="Favour" className="hidden"
                                                onChange={(e) => setOdd(e.target.value)} ref={yesRef} name="odd" />
                                            <div onClick={() => yesRef.current.click()} className={`px-6 py-1 inline-block leading-loose blur-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Favour' && 'btn-blue text-white'} cursor-pointer`}>Yes</div>

                                            <input type="radio" value="Against" id="Against" className="hidden"
                                                onChange={(e) => setOdd(e.target.value)} ref={noRef} name="odd" />
                                            <div onClick={() => noRef.current.click()} className={`px-6 py-1 inline-block leading-loose blur-white hover:btn-blue hover:border-none shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 ${odd == 'Against' && 'btn-blue text-white'} cursor-pointer`}>No</div>
                                        </div>
                                        <div className="my-4 flex flex-col items-center">
                                            <h1 className="font-medium">Amount to Bid : <span className="text-blue-300 inline-flex items-center"><Coin width="4" height="4" />{bid}</span> </h1>
                                            <div className="relative flex items-center space-x-4 mt-4">
                                                <MinusIcon className="w-7 h-7 p-1 font-semibold bg-gray-100 text-gray-900 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid > 50 && setBid(bid - 50); setLowBalance(false) }} />
                                                <input type="number" min="1" minLength="1" maxLength="1000" max="1000" value={bid} onChange={checkBid} className="border border-gray-100 font-semibold text-blue-500 text-center rounded focus:outline-none" />
                                                <PlusIcon className="w-7 h-7 p-1 font-semibold bg-gray-100 text-gray-900 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid < 951 && setBid(+bid + +50); setLowBalance(false) }} />
                                            </div>
                                        </div>
                                        {isSending ? <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]">{'Wait...'}</button>
                                            : <button className={`px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] disabled:text-gray-800 disabled:cursor-not-allowed ${que.qstatus === 'verified' && que.bidClosing > new Date().toISOString() ? 'btn-blue' : 'bg-gray-200'}`} onClick={validate} disabled={que.qstatus !== 'verified' && que.bidClosing < new Date().toISOString()}>{que?.qstatus === 'closed' ? 'Bidding Closed' : 'Apply Bid'}</button>
                                        }
                                        {bid > 0 === 'false' && <p className="text-red-500 text-base mb-4"> Bid amount is low </p>}
                                        {lowBalance && <p className="text-red-500 text-base mb-4"> Not enough balance to bet </p>}
                                        {bidLimit && <p className="text-red-500 text-base mb-4"> Bid amount should in range of 1-1000 </p>}
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>% Bet {`in ${odd}`}</td>
                                                    <td>{Volume > 0 ? (odd == 'Favour') ? Math.round((Favour * 100 / Volume)) : Math.round((Against * 100 / Volume)) : 0}%</td>
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
                                    </motion.div>

                                    <motion.div initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageZoom}
                                        transition={pageTransition} className="bet__container blur-white">
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

                                                    <td className="relative flex items-center md:mt-3">{moment(que?.goLive).format('lll')} <InformationCircleIcon className="w-4 h-4 mx-0.5 text-gray-50 hidden sm:inline-block cursor-pointer info__circle" /> <div className="absolute -top-8 leading-loose left-0 tracking-wide rounded-lg py-0.5 px-2 text-gray-800 bg-white min-w-max info__inner transition-sm">{moment(que?.goLive).format()}</div> </td>

                                                </tr>
                                                {isQueEdit ?
                                                    <>
                                                        <tr><td>
                                                            <label htmlFor="bidClosing" className="inline-block mb-1 font-medium">Bid Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                                                        </td><td>
                                                                <DatePicker className="inline-block w-52 h-12 px-4 mb-2 transition duration-200 text-gray-900 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={bidClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={new Date()} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setBidClosingDate(date)} placeholderText="Bit closing date and time" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label htmlFor="settlementClosing" className="inline-block mb-1 font-medium">Settlement Closing Date &amp; Time<span className="mx-1 text-red-500">*</span></label>
                                                            </td><td>
                                                                <DatePicker className="inline-block w-52 h-12 px-4 mb-2 transition duration-200 text-gray-900 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline" selected={settlementClosingDate} dateFormat="MM/dd/yyyy hh:mm" minDate={addDays(bidClosingDate, 1)} showTimeSelect timeFormat="HH:mm" withPortal onChange={(date) => setSettlementClosingDate(date)} placeholderText="Settlement closing date and time" />
                                                            </td>
                                                        </tr>
                                                    </>
                                                    :
                                                    <>
                                                        <tr>
                                                            <td>Bid Closing Date &amp; Time</td>
                                                            <td className="relative flex items-center md:mt-3">{moment(que?.bidClosing).format('lll')} <InformationCircleIcon className="w-4 h-4 mx-0.5 text-gray-50 hidden sm:inline-block cursor-pointer info__circle" /> <div className="absolute -top-8 leading-loose left-0 tracking-wide rounded-lg py-0.5 px-2 bg-white text-gray-800 info__inner min-w-max transition-sm">{moment(que?.bidClosing).format()}</div> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Settlement Date &amp; Time</td>
                                                            <td className="relative flex items-center md:mt-3">{moment(que?.settlementClosing).format('lll')} <InformationCircleIcon className="w-4 h-4 mx-0.5 text-gray-50 hidden sm:inline-block cursor-pointer info__circle" /> <div className="absolute -top-8 leading-loose left-0 tracking-wide rounded-lg py-0.5 px-2 bg-white text-gray-800 info__inner min-w-max transition-sm">{moment(que?.settlementClosing).format()}</div> </td>
                                                        </tr>
                                                    </>
                                                }
                                                <tr>
                                                    <td>Creator</td>
                                                    <td className="capitalize">{userInfo?.name || questionData?.userId || 'unKnown'}</td>
                                                </tr>
                                                {isQueEdit && <tr>
                                                    <td></td>
                                                    <td>
                                                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={setQuestionStatus}>{updateQue.qstatus === 'closed' ? 'Active' : 'Close'}&nbsp;this Question</button>
                                                    </td>
                                                </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </motion.div>

                                </div>

                                <motion.div initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageSlide}
                                    transition={pageTransition} className="p-5">
                                    {
                                        isQueEdit ?
                                            <>
                                                <h1 className="text-2xl font-semibold my-2">Question Description </h1>
                                                <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} className="bg-white text-gray-900" theme="snow" />
                                            </>
                                            :
                                            que?.desc && <>
                                                <h1 className="text-2xl font-semibold my-2">About the question</h1>
                                                <div className="sm:text-lg que__desc" dangerouslySetInnerHTML={DESC()}></div>
                                            </>
                                    }
                                </motion.div>
                                <motion.div initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageSlide}
                                    transition={pageTransition} className="p-5 pt-0">
                                    {
                                        isQueEdit ?
                                            <input
                                                placeholder="Settlement Link"
                                                type="text"
                                                name="reference"
                                                required
                                                value={updateQue?.reference}
                                                onChange={handleChange}
                                                className="w-full flex-1 h-12 px-4 text-gray-900 font-medium transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                            />
                                            :
                                            <>
                                                {que?.reference && <> <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                                                    <a href={que?.reference} className="my-2 text-blue-500 block text-lg" target="_blank" noreferer="true">{que?.reference}</a> </>}
                                            </>
                                    }
                                </motion.div>
                                {session?.type === 'admin' &&
                                    <> {(isQueEdit) ? <div className="pb-10">
                                        <button className={`px-4 py-1.5 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 btn-blue text-white cursor-pointer`} onClick={updateQuestion}>Update</button>
                                        <button className={`px-4 py-1.5 leading-loose border border-white bg-white text-gray-800 hover:text-gray-50 hover:bg-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 cursor-pointer`} onClick={() => setIsQueEdit(false)}>Cancel</button>
                                    </div> :
                                        <button className={`px-4 py-1.5 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 btn-blue text-white cursor-pointer`} onClick={() => setIsQueEdit(true)}>Edit Question</button>
                                    }
                                    </>
                                }
                                {que.qstatus === 'verified' && que.bidClosing < new Date().toISOString() && <button className={`px-4 py-1.5 leading-loose shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4 btn-blue text-white cursor-pointer`} onClick={() => setIsSettle(true)}>Settle This Question</button>}                                {isSettle && <Settlement isSettle={isSettle} setIsSettle={setIsSettle} queId={que?._id} setQue={setQue} />}

                            </motion.div>
                            <div className="w-full blur-black max-w-5xl gradient-shadow mx-auto rounded-lg lg:p-10 mt-2 sm:mt-4 p-5 py-10 relative flex flex-col-reverse lg:flex-row">
                                <CommentBox queId={que?._id} userId={session?._id} name={session?.name} image_url={session?.image_url} />
                                {session && <UserTransaction queId={que?._id} userId={session?._id} />}
                            </div>
                        </>
                        :
                        <div className="fixed inset-0 w-full h-screen z-50 blur-black flex items-center justify-center max_w_3xl">
                            <Loader />
                        </div>
                } */}
            </div>
            {isActive && <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="fixed top-0 left-0 right-0 bottom-0 w-full h-full blur-black grid place-items-center z-50" >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 blur-gray rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium text-white z-50 leading-tight">
                        Please confirm that you want to place a bid of <div className="flex items-center justify-center">
                            <Coin width="4" height="4" />{bid}
                        </div>
                    </h1>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-100 border border-gray-100 hover:bg-gray-100 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsActive(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleBet}>{'Place Bid'}</button>
                    </div>
                </div>
            </motion.div>}
            {isBidPlaced && <div onClick={() => setIsBidPlaced(false)} ><Modal state={isBidPlaced} text="Bid Placed Successfully" /> </div>}
            {isLoggedIn && <div onClick={() => setIsLoggedIn(false)}><Modal state={isLoggedIn} text="Please login to place a bid" link={'/account/login'} /> </div>}

        </>
    )
}

export default QuestionDetail

export async function getServerSideProps({ params }) {
    const questionData = await fetch(`${process.env.HOST}/api/question/${params._id}`).then(res => res.json())
    if (!questionData) {
        return {
            redirect: {
                destination: '/page_not_found',
                parmanent: false
            }
        }
    }

    return {
        props: {
            questionData
        }
    }
}

