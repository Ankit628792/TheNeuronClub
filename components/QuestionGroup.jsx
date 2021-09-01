import { ArrowRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Question from "./Question";


function QuestionGroup({ questions, category }) {
    return (
        <>
            <div className="p-5 py-10 sm:p-10 xl:px-20">
                <div className="flex justify-between border-b-2 mb-4 pb-2 border-gray-200">
                <h1 className="text-2xl sm:text-3xl font-semibold  text-gray-600">{category} Questions</h1>
                {/* <Link href='/'>

                <h1 className="flex items-center text-base sm:text-lg cursor-pointer text-blue-400 sm:pr-4">View All <ArrowRightIcon className="h-7 mx-2" /></h1>
                </Link> */}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        questions.map((item, i) => (
                            <Question question={item} key={i} />
                        ))
                    }
                    <div className="grid place-items-center text-blue-400 cursor-pointer p-5">
                        <Link href='/'>
                            <h1 className="flex items-center text-lg">
                                View All
                                <ArrowRightIcon className="h-7 mx-2" />
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionGroup
