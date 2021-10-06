import Head from "next/head";
import Steps from "../components/Steps";
import ScrollToTop from "../components/ScrollToTop";

function influencers() {
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

    return (
        <>
            <Head>
                <title>The Neuron | Influencers</title>
            </Head>
            <div className="py-20 relative">
                <h1 className="mt-20 text-5xl font-bold text-center text-gray-800">Get Started with Influencers</h1>
                <div className="h-1 w-60 mx-auto my-4 bg-gray-600"></div>
                <div className="min-h-screen gradient-shadow relative max-w-max mx-auto rounded-lg">
                    {steps.map(item => (<Steps key={item.no} step={item} />))}
                </div>
            </div>
            <ScrollToTop />
        </>
    )
}

export default influencers
