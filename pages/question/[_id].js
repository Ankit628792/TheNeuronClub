function QuestionDetail({ question }) {
    return (
        <div className="pt-28 pb-10">
            <div className="max-w-5xl gradient-shadow mx-auto rounded-lg p-5">
                <div className="text-xl font-medium p-5 sm:flex sm:space-x-4 items-center">
                    <img src={`/images/que/${question.category.toLowerCase()}.jfif`} alt="" className="w-12 h-12 shadow-lg hover:scale-105 transition-md object-cover rounded-full" />
                    <h1 className="my-3 sm:my-0"> {question.question} </h1>
                </div>
                <div className="flex flex-col-reverse md:flex-row w-full bet text-lg justify-around">
                    <div className="bet__container">
                        <div>
                            <button className="btn-invert mx-4">Yes</button>
                            <button className="btn-invert mx-4">No</button>
                        </div>
                        <div className="my-4">
                            <h1 className="font-medium">Amount to Bet <span>$50</span> </h1>
                            <h1>Progress Bar</h1>
                        </div>
                        <table>
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
                        </table>
                    </div>

                    <div className="bet__container">
                        <table>
                            <tr>
                                <td>Volume</td>
                                <td>$1000</td>
                            </tr>
                            <tr>
                                <td>Open Date</td>
                                <td>{new Date(question.createdAt).toDateString()}</td>
                            </tr>
                            <tr>
                                <td>Last Date</td>
                                <td>{new Date(question.bidClosing).toDateString()}</td>
                            </tr>
                            <tr>
                                <td>Settlement Date</td>
                                <td>{new Date(question.settlementClosing).toDateString()}</td>
                            </tr>
                            <tr>
                                <td>Creator</td>
                                <td>{question.userId}</td>
                            </tr>
                        </table>
                    </div>

                </div>
                <div className="p-5">
                    <h1 className="text-2xl font-semibold my-2">About the question</h1>
                    <div className="sm:text-lg">
                        {question.desc.map((item, i) => <p key={i} className="py-2">{item}</p> )}
                    </div>
                </div>
                <div className="px-5 pb-10">
                    <h1 className="text-2xl font-semibold my-2">Source of Settlement</h1>
                    <div className="sm:text-lg">
                        {question.reference.map((item, i) => <a key={i} href={item} className="my-2 text-blue-500 block">{item}</a> )}
                    </div>
                </div>
            </div>
        </div>
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
    return {
        props: {
            question
        }
    }
}
