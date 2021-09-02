import { ClockIcon } from '@heroicons/react/solid'
import Image from 'next/image'

function Question({ question }) {
    return (
        <div className="max-w-xs mx-auto p-4 rounded-lg border-2 hover:gradient-shadow border-blue-500 ">
            <div className="flex space-x-2">
                <h1 className="line-clamp-4 text-base">{question.question}</h1>
                    <img src={question.image} layout="fill" className="w-10 h-10 border-4 border-blue-100 gradient-shadow-lg object-cover rounded-full" />
            </div>
            <h1 className="text-center flex my-2"><ClockIcon className="h-7 text-blue-500" /> <span className="block w-14">4h left</span></h1>
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
