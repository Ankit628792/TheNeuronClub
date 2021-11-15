// import React, { useState } from 'react'
// import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@heroicons/react/solid'

// const data = [
//     { id: 0, imgSrc: '/images/works/o1.png' },
//     { id: 1, imgSrc: '/images/works/o2.png' },
//     { id: 2, imgSrc: '/images/works/o3.png' },
//     { id: 3, imgSrc: '/images/works/o4.png' },
// ]

// export const OnBoardItem = ({ children, width }) => (
//     <div className="carousel-item px-10 md:px-20" style={{ width: width }}>
//         <img src={children} className="w-full h-full rounded-lg object-contain" alt="" />
//     </div>
// )

// function OnBoard(props) {
//     const [activeIndex, setActiveIndex] = useState(0)
//     return (
//         <>
//             {data?.[activeIndex] && <div className="h-screen top-0 left-0 absolute w-full blur-black z-50">
//                 <div className="max_w_3xl carousel fixed top-1/2 transform -translate-y-1/2">
//                     {activeIndex > 0 && <button className="absolute h-1/2 top-1/2 -translate-y-1/2 left-0" onClick={() => setActiveIndex(activeIndex - 1)}><ArrowLeftIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>}
//                     <div className="inner relative" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
//                         {
//                             data.map((item, index) => (
//                                 <OnBoardItem children={item.imgSrc} key={index} width="100%" />
//                             ))
//                         }
//                     </div>
//                     <button className="absolute h-1/2 top-1/2 -translate-y-1/2 right-0" onClick={() => activeIndex === data?.length - 1 ? props.onSelect() : setActiveIndex(activeIndex + 1)} ><ArrowRightIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
//                 </div>
//                 <button className="absolute top-5 right-8" onClick={() => props.onSelect()}><XIcon className="w-10 h-10 p-1 opacity-60 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
//             </div>}
//         </>
//     )
// }

// export default OnBoard






import React, { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

// const data = [
//     { id: 0, imgSrc: '/images/works/o1.png' },
//     { id: 1, imgSrc: '/images/works/o2.png' },
//     { id: 2, imgSrc: '/images/works/o3.png' },
//     { id: 3, imgSrc: '/images/works/o4.png' },
// ]

const data = [
    { id: 1, imgSrc: '/images/onboard/1.png', text: `Check out live questions under the 'Explore' Tab. New questions are added daily` },
    { id: 2, imgSrc: '/images/onboard/2.png', text: `Make predictions on the event before the time runs out! Watch out for the question expiration deadline` },
    { id: 3, imgSrc: '/images/onboard/3.png', text: `You receive a joining bonus of 1000 coins. 100 coins are equivalent to 1 USD. Continue earning coins with daily visits, referrals, completing challenges and weekly activity` },
    { id: 4, imgSrc: '/images/onboard/4.png', text: `Grow your coins with every prediction if your opinion turns out to be correct` },
    { id: 5, imgSrc: '/images/onboard/5.png', text: `We are in the Beta phase! Stay tuned for soon being able to convert coins into real money!` },
]


function OnBoard(props) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [item, setItem] = useState(data[0])

    const prev = () => {
        activeIndex > 0 ? setActiveIndex(activeIndex - 1) : setActiveIndex(data?.length - 1)
        setItem(data[activeIndex])
    }

    const next = () => {
        activeIndex < data?.length - 1 ? setActiveIndex(activeIndex + 1) : setActiveIndex(0)
        setItem(data[activeIndex])
    }


    return (
        <>
            {item?.imgSrc && <div className="h-screen top-0 left-0 absolute w-full z-50">
                <div className="max_w_3xl overflow-hidden fixed h-screen p-5 blur-black w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {activeIndex > 0 && <button className="outline-none border-none focus:border-none focus:outline-none absolute h-1/2 top-1/2 -translate-y-1/2 left-0" onClick={() => prev()}><ArrowLeftIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>}
                    <div className={`w-full h-full sm:p-10 md:p-20 max-h-screen flex ${activeIndex % 2 == 0 ? 'flex-col' : 'flex-col-reverse'} justify-center items-center`}>
                        <motion.img
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 50,
                            }} src={item.imgSrc} className="p-5 h-80 sm:h-full rounded-lg object-contain" alt="" />
                        <h1 className="p-5 text-center text-white text-xl max-w-xl blur-white">{item.text}</h1>
                    </div>
                    <button className="outline-none border-none focus:border-none focus:outline-none absolute h-1/2 top-1/2 -translate-y-1/2 right-0" onClick={() => activeIndex === data?.length - 1 ? props.onSelect() : next()} ><ArrowRightIcon className="w-10 h-10 p-1 opacity-50 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
                </div>
                <button className="outline-none border-none focus:border-none focus:outline-none absolute top-5 right-8" onClick={() => props.onSelect()}><XIcon className="w-10 h-10 p-1 opacity-60 text-gray-800 mx-2 bg-white rounded-full shadow-lg" /> </button>
            </div>}
        </>
    )
}

export default OnBoard
