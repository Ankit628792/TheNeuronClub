import { ClockIcon } from '@heroicons/react/solid'

function Question({ question }) {
    return (
        <div className="max-w-xs mx-auto p-4 rounded-lg border-2 hover:gradient-shadow border-blue-400 cursor-pointer active:scale-[0.98] transition duration-150 ease-linear">
            <div className="mb-4 sm:flex">
                <h1 className="line-clamp-4 text-base">{question.question}</h1>
                <h1 className="text-center flex sm:flex-col mt-2 sm:mt-0"><ClockIcon className="h-7 sm:mx-auto text-blue-400" /> <span className="block w-14">4h left</span></h1>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <h1 className="text-gray-400">Volume</h1>
                    <h2>{question.volume}</h2>
                </div>
                <div className="text-right text-sm">
                    <h1 className="text-gray-400">Bets</h1>
                    <h1>15/78</h1>
                </div>
            </div>
        </div>
    )
}

export default Question
