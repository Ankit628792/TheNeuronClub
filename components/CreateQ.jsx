import { useState, useEffect } from 'react'

function CreateQ() {
    const [isSending, setIsSending] = useState(false)
    const [Paragraph, setParagraph] = useState([])
    const [desc, setDesc] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [data, setData] = useState({
        question: '',
        category: '',
        options: '',
        closing: currentDate,
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
        today = yyyy + '-' + mm + '-' + dd;
        setCurrentDate(today)
    }, [currentDate])

    const addParagraph = (e) => {
        e.preventDefault();
        if(desc.length > 1){
            setParagraph((prev) => [...prev, desc])
            setDesc('')
            setCurrentDate('')
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const question = {...data,Paragraph}
        const res = await fetch(`/api/question/create_question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        })

        if (res.status === 201) {
            setIsSent(true)
            setData({
                question: '',
                category: '',
                options: '',
                closing: currentDate,
            })
            setParagraph([])
        }
        setIsSending(false)
    }
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
                            <label htmlFor="category" className="inline-block mb-1 font-medium">Category</label>
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
                            <label htmlFor="options" className="inline-block mb-1 font-medium">Options</label>
                            <input
                                placeholder="Options"
                                type="text"
                                name="options"
                                value={data.options}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="closing" className="inline-block mb-1 font-medium">Closing Date</label>
                            <input
                                placeholder="Closing Date"
                                type="date"
                                name="closing"
                                min={`${currentDate}`}
                                value={data.closing}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <div className="flex justify-between">
                                <label htmlFor="description" className="inline-block mb-1 font-medium">Description</label>
                                <svg onClick={addParagraph} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <textarea
                                placeholder="Question Description ..."
                                minLength="2"
                                type="text"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="flex-grow w-full resize-none py-2 h-24 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            />
                            {Paragraph && Paragraph.map((item, i) => <p key={i} className="my-2 max-w-lg break-all">{item}</p>)}
                        </div>
                        <div className="my-2 sm:my-3 mt-4">
                            <button type="submit" className="px-5 py-2 gradient-bg text-lg text-white rounded-xl font-semibold active:scale-95 transition-sm">{isSending ? `Adding` : `Add Question`}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateQ
