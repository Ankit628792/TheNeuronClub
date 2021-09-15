import { ChevronDownIcon } from "@heroicons/react/solid";
import Question from "../../components/Question";
import { useState } from 'react'

function index({ data }) {
    const [questions, setQuestions] = useState(data)
    const [filter, setFilter] = useState({
        category: '',
        sort: 'recent',
        search: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    const searchFilter = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/question/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        })
        console.log(res.status)
        const response = await res.json();
        if(res.status === 200){
            setQuestions(response)
        }
    }
    return (
        <>
            <div className="px-5 sm:px-10 pt-28 pb-20 min-h-screen max-w-screen-2xl">

                <div className="filter max-w-2xl sm:ml-auto">

                    <div className="flex items-center">
                        <div className="filter__item">
                            <select
                                placeholder="Category"
                                type="text"
                                name="category"
                                value={filter.category}
                                onChange={handleChange}
                            >
                                <option value="">All</option>
                                <option value="Politics">Politics</option>
                                <option value="Sports">Sports</option>
                                <option value="Science">Science</option>
                                <option value="Coronavirus">Coronavirus</option>
                                <option value="Business">Business</option>
                                <option value="Crypto">Crypto</option>
                                <option value="Science">Science</option>
                                <option value="Chess">Chess</option>
                            </select>
                            <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-1 h-7 w-7" />
                        </div>
                        <div className="filter__item">
                            <select
                                placeholder="Sort"
                                type="text"
                                name="sort"
                                value={filter.sort}
                                onChange={handleChange}
                            >
                                <option value="recent">Most Recent</option>
                                <option value="volume">By Volume</option>
                                <option value="closing">Closing Soon</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                            <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-1 h-7 w-7" />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="filter__item w-full">
                            <input
                                placeholder="Search in Question"
                                type="text"
                                name="search"
                                value={filter.search}
                                onChange={handleChange}
                                className="h-10 w-full px-4 appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button className="btn-invert" onClick={searchFilter}>Apply Filter</button>
                    </div>

                </div>
                <div className="question__group grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    { questions && questions?.length > 0 && 
                        questions.map((item, i) => item.question.toLowerCase().includes(filter.search.toLowerCase()) && <Question key={i} question={item} />)
                    }
                </div>
            </div>
        </>
    )
}

export default index


export async function getServerSideProps(context) {
    const data = await fetch(`${process.env.HOST}/api/question/test_que`).then(res => res.json());
    return {
        props: {
            data
        }
    }
}