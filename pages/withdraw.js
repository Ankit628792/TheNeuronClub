import Router from 'next/router';
import { useState, useEffect } from 'react'
import Accordion from '../components/Accordion';
import Modal from '../components/Modal';
import getCrypto from '../lib/getCrypto';
import { balance, updateBalance } from '../slices/userBalance'
import { useDispatch, useSelector } from 'react-redux'
import { userSession } from '../lib/user-session';
import getCurrency from '../lib/getCurrency';

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
    const amount = useSelector(balance);
    const dispatch = useDispatch();
    const session = userSession()
    const cryptoApi = getCrypto();
    const currencyApi = getCurrency()
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])
    const [isSending, setIsSending] = useState(false)
    const [isSent, setIsSent] = useState(null)
    const [currency, setCurrency] = useState('USD')
    const [currencyValue, setCurrencyValue] = useState(null)
    const [userInfo, setUserInfo] = useState()
    const [data, setData] = useState({
        coins: '',
        crypto: '',
        wallet: ''
    })

    const getUserInfo = async () => {
        if (session) {
            const res = await fetch(`/api/user/info?_id=${session?._id}`)
            if (res.status == 200) {
                const response = await res.json();
                setUserInfo(response)
            } else {
                setUserInfo(null)
            }
        }
    }

    useEffect(() => getUserInfo(), [])


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault(0);
        }
        setIsSending(true);
        if (data) {
            const res = await fetch(`/api/payment/withdrawCoins`, {
                method: 'POST',
                body: JSON.stringify({
                    ...data, 
                    userId: userInfo?._id,
                    name: userInfo?.name,
                    image_url: userInfo?.image_url,
                    email: userInfo?.email,
                    balance: amount,
                    isVerified: userInfo?.isVerified,
                    country: userInfo?.country,
                    type: userInfo?.type,
                })
            })
            if (res.status == 200) {
                const response = await res.json();
                setIsSent(response?.message)
                dispatch(updateBalance(response?.newBalance))
                setData({
                    ...data,
                    balance: response?.newBalance,
                    coins: '',
                    crypto: '',
                    wallet: ''
                })

            } else if(res.status ==403){
                window.alert('Fill all the fields')
            }
             else {
                setIsSent("Error in Sending the Request")
            }
        }
        setIsSending(false)
    }

    useEffect(() => {
        fetch(`https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=${currency}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
                "x-rapidapi-key": "5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4"
            }
        }).then(response => response.json())
            .then(response => {
                setCurrencyValue(response)
            })
            .catch(err => {
                console.error("Cannot get currency data");
            });
    }, [currency, amount])

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
                            <label htmlFor="coins" className="inline-block mb-1 text-white font-medium">Coins<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Coins to Withdraw"
                                min={50}
                                type="number"
                                required
                                name="coins"
                                value={data?.coins}
                                onChange={handleChange}
                                className="flex-grow w-full font-medium h-12 px-4 mb-2 max-w-xs md:max-w-sm transition duration-200 text-gray-800 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="crypto" className="inline-block mb-1 text-white font-medium">Crypto Currency<span className="mx-1 text-red-500">*</span></label>
                            <select
                                placeholder="Crypto"
                                required
                                type="text"
                                value={data?.crypto}
                                name='crypto'
                                onChange={handleChange}
                                className=" h-12 px-4 mb-2 w-full flex-grow transition duration-200 text-gray-800 font-medium bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Choose a Cypto Currency</option>
                                {cryptoApi?.map(item => <option key={item.uuid} value={`${item.name} (${item.symbol})`} className="capitalize">{`${item.name} (${item.symbol})`}</option>)}
                            </select>
                        </div>

                        {currencyApi && data?.coins && <div className="mb-1 sm:mb-2">
                            <label htmlFor="currency" className="inline-block mb-1 text-white font-medium">Choose Your Currency<span className="mx-1 text-red-500">*</span></label>
                            <div className='flex items-center h-12'>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="px-2 py-1 transition duration-200 text-gray-800 font-medium bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    {currencyApi?.map(item => <option key={item} value={item}>{item}</option>)}
                                </select>
                                {currencyValue && <h1 className='text-xl ml-2 font-semibold'>{((data?.coins / 100) * currencyValue).toFixed(5)}</h1>}
                            </div>
                        </div>}
                        <div className="mb-1 sm:mb-2">
                            <label htmlFor="wallet" className="inline-block mb-1 text-white font-medium">Crypto Wallet Address<span className="mx-1 text-red-500">*</span></label>
                            <input
                                placeholder="Wallet Address"
                                type="text"
                                required
                                name="wallet"
                                value={data?.wallet}
                                onChange={handleChange}
                                className="flex-grow w-full font-medium h-12 px-4 mb-2 max-w-xs md:max-w-sm transition duration-200 text-gray-800 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button type='submit' className='btn-primary mt-4 capitalize mx-auto w-full min-w-max' disabled={isSending}>{isSending ? 'Wait...' : 'Send the Request'}</button>
                    </form>

                    <div className="p-5 py-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-50 text-center my-10 ">Frequently Asked Questions</h1>
                        {accordionData.map((item, i) => (
                            <Accordion key={i} title={item.title} content={item.content} desc={item?.desc} />
                        ))}
                    </div>
                </div>
            }
            {isSent && <div onClick={() => setIsSent(null)}><Modal state={Boolean(isSent)} text={isSent} /> </div>}
        </>
    )
}

export default withdraw
