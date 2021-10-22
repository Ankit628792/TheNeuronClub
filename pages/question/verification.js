import { useState, useEffect } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion';
import { pageTransition, pageZoom } from '../../util';
import { XIcon } from '@heroicons/react/solid';
import { userSession } from '../../lib/user-session';
import Router from 'next/router'
import Loader from '../../components/Loader';

export const Detail = ({ que, onSelect, updateQue }) => {
    const [isVerify, setIsVerify] = useState(false)
    const [isInValid, setIsInValid] = useState(false)
    const updateStatus = async ({ qstatus }) => {
        qstatus == 'verified' ? setIsVerify(true) : setIsInValid(true)
        const res = await fetch(`/api/question/verifyQue`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: que?._id, qstatus: qstatus })
        })
        if (res.status === 200) {
            qstatus == 'verified' ? setIsVerify(false) : setIsInValid(false)
            updateQue(que?._id)
            onSelect(null);
        }
        qstatus == 'verified' ? setIsVerify(false) : setIsInValid(false)
        setIsVerify(false)
    }
    function DESC() {
        return { __html: que?.desc };
    }
    return (
        <div className="absolute top-0 left-0 grid place-items-center bg-black bg-opacity-80 w-full min-h-screen z-50">
            <XIcon className="bg-white text-gray-700 w-12 h-12 cursor-pointer rounded-full p-1 absolute top-5 right-6 z-[55]" onClick={() => onSelect(null)} />
            <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="w-full max-w-5xl bg-white rounded-lg py-5">
                <div className="w-full max-w-5xl mx-auto text-xl font-medium p-5 px-10 sm:flex sm:space-x-4 items-center text-gray-700 relative">
                    <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                    <h1 className="my-3 sm:my-0 flex-1"> {que?.question} </h1>
                    <button className="px-4 py-1 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => updateStatus({ qstatus: 'verified' })}>{isVerify ? 'Wait...' : 'Set Verified'}</button>
                    <button className="px-4 py-1 mx-auto leading-loose bg-red-500 text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px] ml-4 sm:ml-0" onClick={() => updateStatus({ qstatus: 'invalid' })} >{isInValid ? 'Wait...' : 'Set Invalid'}</button>
                </div>
                <div className="font-medium text-center sm:text-left space-y-4 text-lg sm:flex flex-wrap items-center justify-around sm:space-x-4 p-5">
                    <div>
                        <h1>Category</h1>
                        <h2 className="font-normal capitalize">{que?.category}</h2>
                    </div>
                    <div>
                        <h1>Creation Date &amp; Time</h1>
                        <h2 className="font-normal">{que?.createdAt && moment(que?.createdAt).format('lll')}</h2>

                    </div>
                    <div>
                        <h1>Open Date &amp; Time</h1>
                        <h2 className="font-normal">{que?.goLive && moment(que?.goLive).format('lll')}</h2>
                    </div>
                    <div>
                        <h1>Last Date &amp; Time</h1>
                        <h2 className="font-normal">{moment(que?.bidClosing).format('lll')}</h2>
                    </div>
                    <div>
                        <h1>Settlement Date &amp; Time</h1>
                        <h2 className="font-normal">{moment(que?.settlementClosing).format('lll')}</h2>
                    </div>
                </div>

                <div className="p-5">
                    <h1 className="text-2xl font-semibold my-2">About the question</h1>
                    <div className="sm:text-lg que__desc" dangerouslySetInnerHTML={DESC()}></div>
                </div>

                {que?.reference && <div className="p-5">
                    <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                    <a href={que?.reference} className="my-2 text-blue-500 block text-lg" target="_blank" noreferer="true">{que?.reference}</a>
                </div>}
            </motion.div>
        </div>
    )
}

function verification() {
    const session = userSession();
    if (!session) {
        Router.push('/')
    }
    if (session?.type === 'admin') {
        Router.push('/')
    }
    const [isQue, setIsQue] = useState()
    const [queList, setQueList] = useState([])

    const getQuestions = async () => {
        const res = await fetch(`/api/question/get_questions?filter=created`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            const response = await res.json();
            setQueList([...response]);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [])

    const updateQue = async (id) => {

        const index = queList.findIndex((q) => q._id == id)
        if (index >= 0) {
            queList.splice(index, 1)
        } else {
            console.warn(`Can't verify question`)
        }
        setQueList([...queList]);
    }


    return (
        <>
            {session ?
                <div className="h-full w-full pt-28 pb-10 sm:pt-20">
                    {isQue && <Detail que={isQue} onSelect={setIsQue} updateQue={updateQue} />}
                    <h1 className="text-xl sm:text-2xl 2xl:text-3xl text-gray-800 font-semibold max-w-5xl mx-auto p-5">Question List For Verification</h1>
                    {queList?.length > 0 ?
                        <>
                            {queList.map(que => (
                                <div key={que?._id} className="w-full max-w-5xl mx-auto text-lg sm:text-xl font-medium p-5 px-10 flex space-x-2 sm:space-x-4 items-center text-gray-700 relative rounded-lg gradient-shadow my-2">
                                    <img src={que?.image_url || `/images/que/${que?.category?.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                                    <h1 className="my-3 sm:my-0 flex-1 line-clamp-1"> {que?.question} </h1>
                                    <button className="px-4 py-1 mx-auto leading-loose gradient-bg text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsQue(que)}>View</button>
                                </div>
                            ))}
                        </>
                        :
                        <h1 className="text-lg sm:text-xl 2xl:text-2xl text-gray-700 font-medium max-w-5xl mx-auto p-5 rounded-lg gradient-shadow">No Questions Available</h1>

                    }
                </div>
                :
                <Loader />
            }
        </>
    )
}

export default verification
