import React, { useState, useEffect } from 'react'

const data = [
    { id: 0, heading: 'Heading of content 1', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imgSrc: 'https://source.unsplash.com/1600x700/?science' },
    { id: 1, heading: 'Heading of content 2', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imgSrc: 'https://source.unsplash.com/1600x700/?politics' },
    { id: 2, heading: 'Heading of content 3', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imgSrc: 'https://source.unsplash.com/1600x700/?entertaiment' },
    { id: 3, heading: 'Heading of content 4', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imgSrc: 'https://source.unsplash.com/1600x700/?crypto' },
    { id: 4, heading: 'Heading of content 5', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', imgSrc: 'https://source.unsplash.com/1600x700/?sports' },
]

export const CarouselItem = ({ children, activeIndex, setActiveIndex }) => (
    <div className="inline-flex items-start justify-start w-full h-full relative">
        <img src={children.imgSrc} className="w-full h-[600px] lg:h-[650px] object-cover" alt="" />
        <div className="absolute max-w-2xl bottom-5 left-4 p-5 md:p-10 lg:max-w-3xl lg:p-16 z-30">
            <h1 className="text-4xl md:text-5xl 2xl:text-6xl pb-2 font-semibold whitespace-normal text-white line-clamp-2">{children.heading}</h1>
            <p className="text-white text-xl 2xl:text-2xl font-medium lg:leading-relaxed whitespace-normal line-clamp-3">{children.desc}</p>
        </div>
        <div className="z-20 w-full h-72 bg-gradient-to-t from-black to-transparent absolute bottom-0"> </div>
        <div className="z-20 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent absolute top-0"> </div>
        <div className="absolute w-full h-12 bottom-0 z-40 flex justify-center items-center p-2">
            {data.map((_, i) => (
                <span key={i} className={`w-3.5 h-3.5 bg-white border-2 rounded-full mx-2 cursor-pointer ${activeIndex == i && 'bg-gray-700 border-8 border-white'}`} onClick={() =>setActiveIndex(i)}></span>
            ))}
        </div>
    </div>
)

function Header2() {
    const [activeIndex, setActiveIndex] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => {
            activeIndex < data.length - 1 ? setActiveIndex(activeIndex + 1) : setActiveIndex(0)
        }, 5000);
        return () => clearTimeout(timer);
    }, [activeIndex]);
    return (
        <>
            {data?.[activeIndex] && <div className="h-[600px] lg:h-[650px] carousel w-full max_w_3xl relative ">
                <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {
                        data.map((item, index) => (
                            <CarouselItem children={item} key={index} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                        ))
                    }
                </div>
            </div>}
        </>
    )
}

export default Header2
