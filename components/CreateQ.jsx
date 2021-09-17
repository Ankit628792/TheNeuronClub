import { useState, useEffect } from 'react'
import Modal from './Modal'
import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


function CreateQ({ session }) {
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [link, setLink] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [data, setData] = useState({
        question: '',
        userId: session?.username || 'Ankit628792',
        category: '',
        bidClosing: '',
        options: ['Yes', 'No'],
        settlementClosing: '',
        qstatus: 'verified',
    })
    const [desc, setDesc] = useState('')
    function createMarkup() {
        return { __html: value };
    }

    useEffect(() => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
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

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const question = { ...data, desc, link }
        const res = await fetch(`/api/question/create_question`, {
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
                userId: session?.username || 'Ankit628792',
                category: '',
                bidClosing: '',
                options: ['Yes', 'No'],
                settlementClosing: '',
                qstatus: 'verified',
            })
            setLink('');
            setDesc('');
        }
        setIsSending(false)
    }

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                'link'
            ]
        ],
        clipboard: {
            matchVisual: false,
        },
    }

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]

    return (
        <>
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
                            <label className="inline-block mb-1 font-medium">Settlement Link</label>
                            <input
                                placeholder="Settlement Link ..."
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                className="flex-grow w-full resize-none py-2 h-12 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="inline-block mb-1 font-medium">Question Description</label>
                            <QuillNoSSRWrapper modules={modules} placeholder='Add description here ...' value={desc} onChange={setDesc} formats={formats} theme="snow" />
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

export default CreateQ
