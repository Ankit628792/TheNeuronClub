import Steps from "../components/Steps";

function how_it_works() {
    const steps = [
        {
            no: 1,
            img:"/images/step1.svg",
            heading: "Choose an Event",
            desc: "Select an event that matters to you. At TheNeuron.club you get opportunity to beton a wide range of events curated by us everyday"
        },
        {
            no: 2,
            img:"/images/step2.svg",
            heading: "Place your bet",
            desc: "Place your bet on the expected outcome. You can place multiple bets, as well as take several positions"
        },
        {
            no: 3,
            img:"/images/step3.svg",
            heading: "Wait for settlement",
            desc: "Monitor the event as it unfolds, and wait for the final settlement."
        }
    ]
    return (
        <>
        <div className="py-10 pt-20">
            <h1 className="mt-20 text-5xl font-bold text-center text-gray-700">How it Works</h1>
            <div className="h-1 w-48 mx-auto my-4 bg-gray-500"></div>

        <div className="py-10 min-h-screen space-y-20">
           {steps.map(item => (<Steps key={item.no} step={item} />))}
        </div>
        </div>
        </>
    )
}

export default how_it_works
