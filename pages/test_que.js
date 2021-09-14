import Head from "next/head"
import { useState, useEffect } from 'react'
import Modal from "../components/Modal"

function create_question() {
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [paragraph, setParagraph] = useState('')
    const [desc, setDesc] = useState([])
    const [link, setLink] = useState('')
    const [reference, setReference] = useState([])
    const [currentDate, setCurrentDate] = useState('')
    const [data, setData] = useState({
        question: '',
        userId: 'a1b2c3d4',
        category: '',
        bidClosing: '',
        options: ['Yes', 'No'],
        settlementClosing: '',
        qstatus: 'created',
    })

    useEffect(() => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        // today = yyyy + '-' + mm + '-' + dd;
        today = `${yyyy}-${mm}-${dd}T${today.getHours()}:${today.getMinutes()}`
        setCurrentDate(today)
    }, [currentDate])

    const addDesc = (e) => {
        e.preventDefault();
        if (paragraph.length > 1) {
            setDesc((prev) => [...prev, paragraph])
            setParagraph('')
            setCurrentDate('')
        }
    }
    const addReference = (e) => {
        e.preventDefault();
        if (link.length > 1) {
            setReference((prev) => [...prev, link])
            setLink('')
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const question = { ...data, desc, reference }
        const res = await fetch(`/api/question/test_que`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })

        console.log(res.status)
        if (res.status === 201) {
            setIsSent(true)
            setData({
                question: '',
                userId: 'a1b2c3d4',
                category: '',
                bidClosing: '',
                settlementClosing: '',
                status: '',
                creationTime: Date.now(),
            })
            setReference([]);
            setDesc([]);
        }
        setIsSending(false)
    }
    return (
        <>
            <Head>
                <title>Create Test Question</title>
            </Head>
            <div className="w-full pt-28 pb-16">
                <div className="bg-white rounded gradient-shadow mx-auto p-7 sm:p-10 max-w-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="Question" className="inline-block mb-1 font-medium">Question</label>
                            <input
                                placeholder="Question"
                                required
                                minLength="2"
                                type="text"
                                name="question"
                                value={data.question}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="category" className="inline-block mb-1 font-medium">Question Category</label>
                            <input
                                placeholder="Coronavirus, Business ..."
                                required
                                type="text"
                                name="category"
                                value={data.category}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="qstatus" className="inline-block mb-1 font-medium">Question Current Status</label>
                            <select
                                placeholder="Status"
                                type="text"
                                name="qstatus"
                                value={data.qstatus}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            >
                                <option value="created">Created</option>
                                <option value="verified">Verified</option>
                                <option value="completed">Completed</option>
                                <option value="settled">settled</option>
                            </select>
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="bidClosing" className="inline-block mb-1 font-medium">Bid Closing Date &amp; Time</label>
                            <input
                                placeholder="Bit Closing"
                                type="datetime-local"
                                name="bidClosing"
                                min={`${currentDate}`}
                                value={data.bidClosing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="settlementClosing" className="inline-block mb-1 font-medium">Settlement Closing Date &amp; Time</label>
                            <input
                                placeholder="Settlement Closing"
                                type="datetime-local"
                                name="settlementClosing"
                                min={`${currentDate}`}
                                value={data.settlementClosing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between">
                                <label htmlFor="reference" className="inline-block mb-1 font-medium">Reference Links</label>
                                <div className="flex items-center mb-1 cursor-pointer" onClick={addReference}>
                                    Add this link
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <input
                                placeholder="Reference Link ..."
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="flex-grow w-full resize-none py-2 h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {reference && reference.map((item, i) => <a key={i} className="mb-1 max-w-lg break-all text-blue-600 block">{item}</a>)}
                        </div>
                        <div className="my-1 sm:my-3">
                            <div className="flex justify-between">
                                <label htmlFor="description" className="inline-block mb-1 font-medium">Description</label>
                                <div className="flex items-center mb-1 cursor-pointer" onClick={addDesc}>
                                    Add this paragraph
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <textarea
                                placeholder="Question Description ..."
                                minLength="2"
                                type="text"
                                value={paragraph}
                                onChange={(e) => setParagraph(e.target.value)}
                                className="flex-grow w-full resize-none py-2 h-24 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                            {desc && desc.map((item, i) => <p key={i} className="my-2 max-w-lg break-all">{item}</p>)}
                        </div>
                        <div className="my-2 sm:my-3">
                            <button type="submit" className="px-5 py-2 gradient-bg text-lg text-white rounded-xl font-semibold active:scale-95 transition-sm">{isSending ? `Adding` : `Add Question`}</button>
                        </div>
                    </form>
                </div>
            </div>
            {isSent && <Modal state={isSent} text="Question created successfully" />}
        </>
    )
}

export default create_question
