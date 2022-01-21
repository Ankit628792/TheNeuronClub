import Router from 'next/router';
import { useState, useEffect } from 'react'
import Accordion from '../components/Accordion';
import Modal from '../components/Modal';
import { userSession } from '../lib/user-session';

const accordionData = [
    {
        title: 'What is the Neuron Club?',
        content: `Neuron Club is an application designed for those who are proud to have an opinion. This is a financial exchange for users to trade on opinions regarding the outcome of events of interest`
    },
    {
        title: `How does Neuron Club work?`,
        content: `Neuron Club provides a trading platform where users can trade on the outcome of events. Based on your opinion, you can choose to bet on how a specific event will turn out to be. Once the question is frozen for trading, no more trades are allowed. Thereafter, when the question is decided based on an independent source, the trading pool is distributed amongst those who predicted the correct outcome`
    },
    {
        title: `How is the winning payout decided?`,
        content: `The winner’s payout is proportional to the amount invested in the question. All the trades are combined to create a question prize pool. Once the question has been decided, the question pool is distributed amongst those with a correct prediction, in proportion to the amount invested`
    },
    {
        title: `How is Neuron different from a gambling or betting platform?`,
        content: `There are several fundamental differences between trading on a prediction market vs a gambling platform:`,
        desc: [`On the Neuron platform, you are competing against other players who have a different opinion than you on the events of interest. However, on a gambling platform, you are competing against the booker (sports betting website). So betting websites are incentivized to tweak the odds against you while The Neuron club team remains a neutral market observer and doesn’t take a stake on any side`, `Trading on the Neuron platform is a game of skill. In a game of skill, you can increase your odds of winning by doing research, strategizing, and selectively picking the questions. However, on a betting platform, luck plays a very important role in deciding the winner and anyone can make a bet and get lucky.`, `In a game of skill, players are seen to get better with time as they learn more about the strategies to maximize your winning. However, in a gambling platform, players do not necessarily get better with time`]
    },
    {
        title: `How is Neuron different from a stock trading platform?`,
        content: `Our vision for TheNeruon.club is to develop it along the lines of a stock trading platform and offer users similar functionalities. The Neuron platform allows users to trade on the outcome of events beyond the business domain, thus offering a much wider scope of services`
    },
    {
        title: `What is the signup offer?`,
        content: `When you join, we gift you 1000 coins worth $10 as a welcome bonus. You can use these coins on TheNeuron.club to invest in questions. You can check your coin balance on top of the page.`
    },
    {
        title: `What are neuron.club points?`,
        content: ` Neuron.club points is currency which you can use on Neuron.club to invest. 100 coins are equivalent of 1$`
    },
    {
        title: `How can I convert coins to money?`,
        content: `We will soon begin supporting converting coins to money. Meanwhile, please continue to bet and earn more coins`
    },
    {
        title: `How can I add coins to my wallet?`,
        content: `We will soon begin supporting addition of coins to the wallet. Currently, you can earn more coins by logging in daily, and doing additional transactions.`
    },
    {
        title: `How can I earn more coins?`,
        content: `Firstly, you can earn more coins when you predict correctly. Secondly, we continue to provide you additional coins for certain activities -`,
        desc: [`You earn 100 coins every day you visit TheNeuron.club`, `You earn 200 coins when you do your first investment on any question`, `You earn 500 coins every time you invest in at least 3 questions in a week`]
    },

];

function withdraw() {
    const session = userSession()
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [data, setData] = useState({
        amount: null,
        name: null,
        mob: null
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    console.log(data)

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault(0);
        }
        setIsSending(true);
        setIsSent(true)
        setIsSending(false)
    }
    return (
        <>
            {session &&
                <div className='text-white text-center p-5 min-h[500px]'>
                    {/* <div className='blur-blue rounded-2xl max-w-max p-5 lg:px-8 mx-auto'>
                    <h1 className='text-xl font-semibold sm:text-2xl lg:text-3xl'>Available for Withdrawal</h1>
                    <p className='font-medium text-gray-100 py-2 text-xl sm:text-2xl'>$10,000</p>
                </div> */}
                    <div className='py-10'>
                        <h1 className='text-4xl sm:text-5xl xl:text-6xl text-white mb-2 font-semibold'>Transaction in Crypto is Possible</h1>
                        <p className='text-lg xl:text-xl 2xl:text-2xl text-gray-200 max-w-3xl mx-auto my-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde maxime praesentium numquam nesciunt facilis magni vel animi corrupti?</p>
                    </div>

                    <form onSubmit={handleSubmit} className="blur-blue text-left max-w-xs md:max-w-sm px-5 py-10 sm:px-10 rounded-xl mx-auto">
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="amount" className="inline-block mb-1 text-white font-medium">Amount<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Amount to Withdraw"
                                min={0}
                                type="number"
                                name="amount"
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 max-w-xs md:max-w-sm transition duration-200 text-gray-800 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="name" className="inline-block mb-1 text-white font-medium">Full Name<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Your Name"
                                type="text"
                                name="name"
                                className="flex-grow w-full h-12 px-4 mb-2 max-w-xs md:max-w-sm transition duration-200 text-gray-800 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="mob" className="inline-block mb-1 text-white font-medium">Mobile No<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Include Country Code"
                                minLength={8}
                                type="text"
                                name="mob"
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 max-w-xs md:max-w-sm transition duration-200 text-gray-800 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button type='submit' className='btn-primary mt-4 capitalize mx-auto w-full min-w-max'>Send the Request</button>
                    </form>

                    <div className="p-5 py-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-50 text-center my-10 ">Frequently Asked Questions</h1>
                        {accordionData.map((item, i) => (
                            <Accordion key={i} title={item.title} content={item.content} desc={item?.desc} />
                        ))}
                    </div>
                </div>
            }
            {isSent && <div onClick={() => setIsSent(false)}><Modal state={isSent} text="Request Sent successfully" /> </div>}
        </>
    )
}

export default withdraw
