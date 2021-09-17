import Head from 'next/head'
import Loader from '../../components/Loader'
import { useState } from 'react'
import moment from 'moment'

function QuestionDetail({ question }) {
    const [bid, setBid] = useState(1)
    return (
        <>
            <Head>
                <title>Question Detail</title>
            </Head>
            <div className="pt-28 pb-10">
                {
                    question ?
                        <div className="max-w-5xl gradient-shadow mx-auto rounded-lg p-5 lg:p-10">
                            <div className="text-xl font-medium mb-2 sm:mb-4 p-5 sm:flex sm:space-x-4 items-center">
                                <img src={`/images/que/${question?.category.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                                <h1 className="my-3 sm:my-0"> {question?.question} </h1>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row w-full bet text-lg justify-around">
                                <div className="bet__container">
                                    <div>
                                        <button className="px-4 py-2 leading-loose border border-blue-500 hover:gradient-bg text-lg text-white rounded font-semibold active:scale-95 transition duration-100 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4">Yes</button>
                                        <button className="px-4 py-2 leading-loose border border-blue-500 hover:gradient-bg text-lg text-white rounded font-semibold active:scale-95 transition duration-100 ease-in-out focus:outline-none focus:border-none min-w-[100px] mx-4">No</button>
                                    </div>
                                    <div className="my-4">
                                        <h1 className="font-medium">Amount to Bet : <span className="text-blue-600">${bid}</span> </h1>
                                        <div className="relative flex items-center space-x-4">
                                            <label className="font-bold">$ </label>
                                            <input type="range" name="bid" id="slider" min="1" max="100" value={bid} onChange={(e) => setBid(e.target.value)} />
                                        </div>
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Bet in favour</td>
                                                <td>30%</td>
                                            </tr>
                                            <tr>
                                                <td>Fees</td>
                                                <td>2%</td>
                                            </tr>
                                            <tr>
                                                <td>Likely earnings</td>
                                                <td>$350</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bet__container">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Volume</td>
                                                <td>$1000</td>
                                            </tr>
                                            <tr>
                                                <td>Open Date</td>
                                                <td>{moment(question?.createdAt).format('ll')}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Date</td>
                                                <td>{moment(question?.bidClosing).format('ll')}</td>
                                            </tr>
                                            <tr>
                                                <td>Settlement Date</td>
                                                <td>{moment(question?.settlementClosing).format('ll')}</td>
                                            </tr>
                                            <tr>
                                                <td>Creator</td>
                                                <td>{question?.userId}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="p-5">
                                <h1 className="text-2xl font-semibold my-2">About the question</h1>
                                <div className="sm:text-lg">
                                    {question && question?.desc.map((item, i) => <p key={i} className="py-2">{item}</p>)}
                                </div>
                            </div>
                            <div className="px-5 pb-10">
                                <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                                <div className="sm:text-lg">
                                    {question && question?.reference.map((item, i) => <a key={i} href={item} className="my-2 text-blue-500 block">{item}</a>)}
                                </div>
                            </div>
                        </div>
                        :
                        <Loader />
                }
            </div>
        </>
    )
}

export default QuestionDetail

export async function getStaticPaths() {
    const questions = await fetch(`${process.env.HOST}/api/question/test_que`).then(res => res.json())
    const data = questions.map(question => {
        return {
            params: {
                _id: question._id
            }
        }

    })
    return {
        paths: data,
        fallback: true,
    }

}

export async function getStaticProps({ params }) {
    const question = await fetch(`${process.env.HOST}/api/question/${params._id}`).then(res => res.json())
    if (!question) {
        return {
            redirect: {
                destination: '/page_not_found',
                parmanent: false
            }
        }
    }
    return {
        props: {
            question
        }
    }
}
