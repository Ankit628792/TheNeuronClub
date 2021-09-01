import { useState } from 'react'

function Accordion({ title, content }) {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className={`max-w-xl md:max-w-2xl lg:max-w-3xl mb-5 md:mb-8 cursor-pointer mx-auto rounded-lg gradient-shadow`}>
            <div className="gradient-bg text-white font-semibold px-5 py-2 text-lg space-x-4 flex items-center justify-between" onClick={() => setIsActive(!isActive)}>
                <h1>{title}</h1>
                {
                    isActive ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                }
            </div>
            {isActive && <p className="text-base text-gray-600 py-3 px-6 text-justify">{content}</p>}
        </div>
    )
}

export default Accordion
