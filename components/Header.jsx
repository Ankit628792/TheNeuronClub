import Image from 'next/image'
import Link from 'next/link'

function Header() {
//     <div className="mb-4">
//     <h1 className="line-clamp-4 text-base">{question.question}</h1>
//     <h1 className="text-center flex mt-2"><ClockIcon className="h-7 text-blue-400" /> <span className="block w-14">4h left</span></h1>
// </div>
    return (
        <div className="relative gradient-bg min-h-screen md:min-h-[550px] lg:min-h-[600px]">
            <div className="absolute flex flex-col-reverse md:flex-row w-full items-center bottom-0 p-10 lg:px-28 left-0 text-white">
                <div>
                    <h1 className='text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl'>Why Bet on <br /> Just Sports ?</h1>
                    <p className="py-4 text-base sm:text-lg max-w-md lg:text-xl">Join TheNeuron.club to bet directly on the outcome of events. We've built a next gen betting platform for you to bet on your opinion.</p>
                    <Link href="/subscribe">
                        <button className="btn lg:text-xl mt-2">Place a Bet</button>
                    </Link>
                </div>
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:scale-125 mx-auto">
                    <Image src="/images/banner.webp" layout="fill" objectFit="contain" className="drop-shadow-lg" />
                </div>

            </div>
            <div className="custom-shape-divider-bottom-1630315778">
                <svg data-name="SVG Layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                </svg>
            </div>
        </div>
    )
}

export default Header
