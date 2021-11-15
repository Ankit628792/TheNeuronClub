import { ClockIcon, MinusIcon, PlusIcon } from '@heroicons/react/solid'
import Router from 'next/router'
import moment from 'moment';
import { motion } from 'framer-motion';
import { pageTransition, pageZoom } from './../util';
import { balance, updateBalance } from './../slices/userBalance'
import { useDispatch, useSelector } from 'react-redux'
import { userSession } from './../lib/user-session';
import { useState } from 'react';
import Modal from './Modal'
import Coin from './Coin';

function Question({ question }) {
    const closingTime = moment(question?.bidClosing).fromNow()
    const handleClick = () => {
        Router.push({
            pathname: `/question/${question._id}`
        })
    }
    const session = userSession()
    const dispatch = useDispatch()
    const [bidModal, setBidModal] = useState({ state: false, odd: null })

    const amount = useSelector(balance)
    const [isBidPlaced, setIsBidPlaced] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [lowBalance, setLowBalance] = useState(false)
    const [bidLimit, setBidLimit] = useState(false)
    const [bid, setBid] = useState(50)
    const [que, setQue] = useState(question)

    const handleBet = async () => {
        if (session && bidModal?.odd) {
            setIsSending(true)
            if (amount > 0 && amount >= bid) {
                console.log(que)
                const { _id, question, category, settlementClosing } = que
                console.log({ bid, _id, userId: session?._id, question, category, odd: bidModal?.odd, settlementClosing })
                const res = await fetch(`/api/transaction/question`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bid, _id, userId: session?._id, question, category, odd: bidModal?.odd, settlementClosing })
                })
                console.log(res.status)
                const response = await res.json();
                if (res.status == 201 || res.status == 203) {
                    dispatch(updateBalance(amount - response?.reductionAmount))
                    setBidModal({ state: false, odd: null })
                    setIsBidPlaced(true)
                }
            }
            else {
                setLowBalance(true)
            }
            setIsSending(false)
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
    return (
        <>
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="text-white max-w-xs p-5 shadow-lg relative blur-black rounded-lg">
                <h1 className="absolute top-0 right-0 py-1 px-2 blur-blue rounded-tr-lg rounded-bl-lg">{closingTime?.includes('ago') ? `closed ${closingTime}` : `closing ${closingTime}`}</h1>
                <img className="w-full h-48 object-cover rounded-lg cursor-pointer" onClick={handleClick} src={question?.image_url || `images/que/${question.category}.jfif`} alt="" />
                <div className="py-5 font-medium h-full">
                    <h1 className="text-lg text-center mb-4 cursor-pointer line-clamp-3 h-[88px]" onClick={handleClick}>{question.question}</h1>
                    <div className="flex justify-around items-center text-lg">
                        <div className="flex flex-col items-center justify-center">
                            <button className="font-semibold btn-blue rounded-3xl py-2 px-6 mb-2" onClick={() => session ? setBidModal({ state: true, odd: 'Favour' }) : setIsLoggedIn(true)}>Yes</button>
                            <h1 className="font-normal text-center leading-none">{question?.Favour > 0 ? Math.round((question?.Favour * 100 / question.Volume)) : 0}%<br />says yes</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <button className="font-semibold btn-orange rounded-3xl py-2 px-6 mb-2" onClick={() => session ? setBidModal({ state: true, odd: 'Against' }) : setIsLoggedIn(true)}>No</button>
                            <h1 className="font-normal text-center leading-none">{question?.Against > 0 ? Math.round((question?.Against * 100 / question.Volume)) : 0}%<br />says no</h1>
                        </div>
                    </div>
                </div>
            </motion.div>


            {bidModal?.state && <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="fixed inset-0 w-full h-full grid place-items-center z-50 blur-black max_w_3xl" >
                <div className="relative max-w-sm md:max-w-md p-5 lg:py-10 md:px-10 blur-black text-white rounded-xl shadow-2xl m-4">
                    <div className="my-4 flex flex-col items-center">
                        <h1 className="font-medium text-2xl lg:text-3xl text-center">{que?.question} </h1>
                        {lowBalance && <p className="text-red-500 text-base mt-2"> Not enough balance to bet </p>}
                        {bidLimit && <p className="text-red-500 text-base mt-2"> Bid amount should in range of 1-1000 </p>}
                        <div className="relative flex items-center space-x-4 my-4">
                            <MinusIcon className="w-7 h-7 p-1 font-semibold bg-gray-50 text-gray-800 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid > 50 && setBid(bid - 50); setLowBalance(false); setBidLimit(false) }} />
                            <input type="number" min="1" minLength="1" maxLength="1000" max="1000" value={bid} onChange={checkBid} className="border border-gray-800 font-semibold text-blue-400 text-center text-xl lg:text-2xl rounded focus:outline-none" />
                            <PlusIcon className="w-7 h-7 p-1 font-semibold bg-gray-50 text-gray-800 rounded-full cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.99]" onClick={() => { bid < 951 && setBid(+bid + +50); setLowBalance(false); setBidLimit(false) }} />
                        </div>
                        <h1 className="font-medium text-gray-50 text-xl lg:text-2xl flex items-center justify-center flex-wrap">You're placing a bid of &nbsp;<span className="text-blue-400 inline-flex items-center"><Coin width="4" height="4" />{bid}</span>&nbsp;in <span className="text-blue-400 capitalize">{bidModal?.odd}</span> </h1>
                    </div>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-50 border border-gray-50 hover:bg-gray-50 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" disabled={isSending} onClick={() => setBidModal({ state: false, odd: null })}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleBet} disabled={isSending}>{isSending ? 'Wait..' : 'Place Bid'}</button>
                    </div>
                </div>
            </motion.div>}
            {isBidPlaced && <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition}
                onClick={() => setIsBidPlaced(false)}
                className="fixed inset-0 w-full h-full grid place-items-center z-50 blur-black max_w_3xl" >
                <Modal state={isBidPlaced} text="Bid Placed Successfully" />
            </motion.div>
            }
            {isLoggedIn && <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition}
                onClick={() => setIsLoggedIn(false)}
                className="fixed inset-0 w-full h-full grid place-items-center z-50 blur-black max_w_3xl" >
                <Modal state={isLoggedIn} text="Please login to place a bid" link={'/account/login'} />
            </motion.div>
            }
        </>

        // <motion.div
        //     initial="initial"
        //     animate="in"
        //     exit="out"
        //     variants={pageZoom}
        //     transition={pageTransition}
        //     className="question max-w-xs min-h-[175px] mx-auto p-4 rounded-lg bg-white flex flex-col transition-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer" onClick={handleClick}>
        //     <div className="flex space-x-2 flex-col-reverse sm:flex-row">
        //         <h1 className="line-clamp-4 text-gray-800 text-base font-medium mt-1 sm:mt-0">{question?.question}</h1>
        //         <img src={question?.image_url || `/images/que/${question?.category.toLowerCase()}.jfif`} layout="fill" className="w-10 h-10 border-4 border-white hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
        //     </div>
        //     <div className="h-4 w-full"></div>
        //     <div className="flex items-center justify-between mt-auto">
        //         <div className="text-sm">
        //             <h1 className="text-gray-400">Category</h1>
        //             <h2 className="capitalize">{question?.category}</h2>
        //         </div>
        //         <div className="text-right flex flex-col items-end text-sm">
        //             <ClockIcon className="h-6 sm:h-7 text-blue-500" /> <span className="">
        //                 {moment(question?.settlementClosing).fromNow() || moment(question?.bidClosing).fromNow()}
        //             </span>
        //         </div>
        //     </div>
        // </motion.div>
    )
}

export default Question
