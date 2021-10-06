import Head from "next/head";
import Steps from "../components/Steps";
import { useState } from 'react'
import ScrollToTop from "../components/ScrollToTop";

function how_it_works() {
    const steps = [
        {
            no: 1,
            img: "/images/step1.svg",
            heading: "Choose a Topic",
            desc: "Select a topic that matters to you. At TheNeuron.club (TNC) you get an opportunity to predict across wide range of topics curated by us everyday"
        },
        {
            no: 2,
            img: "/images/step2.svg",
            heading: "Predict the outcome",
            desc: "Predict the expected outcome of the topic."
        },
        {
            no: 3,
            img: "/images/step3.svg",
            heading: "Wait for settlement",
            desc: "Monitor the topic as it unfolds, and wait for the final settlement."
        }
    ]

    const [active, setActive] = useState('bid')
    return (
        <>
            <Head>
                <title>The Neuron | How it Works</title>
            </Head>
            <div className="py-20 relative">
                <h1 className="mt-20 text-5xl font-bold text-center text-gray-800">Get Started with { active==='bid' ? 'Bid' : 'Coins'}</h1>
                <div className="h-1 w-60 mx-auto my-4 bg-gray-600"></div>

                <div className=" flex mx-auto w-full justify-center mt-10">
                    <button className={`px-4 py-2 text-lg font-medium bg-gray-50 border border-b-0 mx-2 text-gray-700 rounded-t-md min-w-[100px] shadow-sm transition-sm ${active==='bid' && 'gradient-bg text-white gradient-shadow border-none'}`} onClick={() => setActive('bid')}>Place a Bid </button>
                    <button className={`px-4 py-2 text-lg font-medium bg-gray-50 border border-b-0 mx-2 text-gray-700 rounded-t-md min-w-[100px] shadow-sm transition-sm ${active==='coin' && 'gradient-bg text-white gradient-shadow border-none'}`} onClick={() => setActive('coin')}>Coins </button>
                </div>
                <div className="min-h-screen shadow-xl gradient-shadow relative max-w-max mx-auto rounded-lg border border-blue-500">
                    {steps.map(item => (<Steps key={item.no} step={item} />))}
                </div>
            </div>
            <ScrollToTop />
        </>
    )
}

export default how_it_works
