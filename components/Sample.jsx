function Sample() {
    return (
        <><div className="py-28 px-10">
            <div className="p-5 text-gray-800 flex justify-between">
                <div className="relative cursor-pointer">
                    <picture>
                        <source media="(max-width: 640px)" srcSet="/favicon.png" />
                        <source media="(min-width: 640px)" srcSet="/images/beta-logo.png" />
                        <img src="/images/logo.png" layout="fill" className="h-12 w-12 sm:w-48 object-contain drop-shadow-md overflow-hidden" />
                    </picture>
                </div>
                <ul className="flex items-center space-x-5 text-xl font-medium">
                    <li>Explore</li>
                    <li>How it works</li>
                    <li>Contact</li>
                    <a className="px-4 py-2 border rounded-xl">Get Started</a>
                </ul>
            </div>
            <div className="p-10 h-[600px] rounded-xl flex items-center justify-start relative" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x700/?hotel)', margin: '1rem 2rem' }}>
                <div className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" style={{ background: 'linear-gradient(to right, rgb(151 255 250) 40%, transparent 100%)' }}>
                </div>
                <div className="max-w-xl p-10 z-30">
                    <h1 className="font-bold" style={{ fontSize: '4rem', lineHeight: '4.1rem' }}>Predict future and win rewards!</h1>
                    <p className="text-lg mt-4 line-clamp-2">The Neuron Club (TNC) is an online gaming platform that allows users to predict global events across categories and win rewards</p>
                </div>
            </div>
            <h1 className="text-center font-bold text-5xl mt-20 text-gray-800">Entire city of choice</h1>
            <div className="p-5 mt-5 grid sm:grid-cols-3 gap-10 mx-auto w-full max-w-7xl">
                <div className="max-w-xs relative rounded-xl shadow-lg text-gray-700 font-medium text-lg">
                    <img className="w-full h-80 object-cover rounded-xl" src="https://source.unsplash.com/1400x700/?politics" alt="" />
                    <div className="absolute z-20 rounded-xl top-0 p-5 text-3xl font-semibold tracking-wider w-full h-full bg-black bg-opacity-20 text-white flex">
                        <img src={`/images/que/politics.jfif`} layout="fill" className="w-10 h-10 border-4 border-white shadow-xl hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
                        <p className="ml-2">Politics</p>
                        
                    </div>
                    <div className="z-30 absolute bottom-0 bg-white bg-opacity-50 w-full p-5 rounded-b-xl">
                        <div className="flex justify-between text-xl items-center">
                            <h1 className="text-blue-500 text-left"><span className="text-lg text-gray-600">Volume</span> <br /> $1131</h1>
                            <h2 className="text-gray-800 text-right"><span className="text-lg text-gray-600">Closing in</span><br /> 23 days</h2>
                        </div>
                        <div className="flex justify-around mt-4">
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-green-500">Yes</button>
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-red-500">No</button>
                        </div>
                    </div>
                </div>
                

                <div className="max-w-xs relative rounded-xl shadow-lg text-gray-700 font-medium text-lg">
                    <img className="w-full h-80 object-cover rounded-xl" src="https://source.unsplash.com/1400x700/?entertainment" alt="" />
                    <div className="absolute z-20 rounded-xl top-0 p-5 text-3xl font-semibold tracking-wider w-full h-full bg-black bg-opacity-20 text-white flex">
                        <img src={`/images/que/entertainment.jfif`} layout="fill" className="w-10 h-10 border-4 border-white shadow-xl hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
                        <p className="ml-2">Entertainment</p>
                    </div>
                    <div className="z-30 absolute bottom-0 bg-white bg-opacity-60 w-full p-5 rounded-b-xl">
                        <div className="flex justify-between text-xl items-center">
                            <h1 className="text-blue-500 text-left"><span className="text-lg text-gray-600">Volume</span> <br /> $1114</h1>
                            <h2 className="text-gray-800 text-right"><span className="text-lg text-gray-600">Closing in</span><br /> 15 days</h2>
                        </div>
                        <div className="flex justify-around mt-4">
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-green-500">Yes</button>
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-red-500">No</button>
                        </div>
                    </div>
                </div>

                <div className="max-w-xs relative rounded-xl shadow-lg text-gray-700 font-medium text-lg">
                    <img className="w-full h-80 object-cover rounded-xl" src="https://source.unsplash.com/1400x700/?sports" alt="" />
                    <div className="absolute z-20 rounded-xl top-0 p-5 text-3xl font-semibold tracking-wider w-full h-full bg-black bg-opacity-20 text-white flex">
                        <img src={`/images/que/sports.jfif`} layout="fill" className="w-10 h-10 border-4 border-white shadow-xl hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
                        <p className="ml-2">Sports</p>
                    </div>
                    <div className="z-30 absolute bottom-0 bg-white bg-opacity-70 w-full p-5 rounded-b-xl">
                        <div className="flex justify-between text-xl items-center">
                            <h1 className="text-blue-500 text-left"><span className="text-lg text-gray-600">Volume</span> <br /> $1424</h1>
                            <h2 className="text-gray-800 text-right"><span className="text-lg text-gray-600">Closing in</span><br /> 15 days</h2>
                        </div>
                        <div className="flex justify-around mt-4">
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-green-500">Yes</button>
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-red-500">No</button>
                        </div>
                    </div>
                </div>

                <div className="max-w-xs relative rounded-xl shadow-lg text-gray-700 font-medium text-lg">
                    <img className="w-full h-80 object-cover rounded-xl" src="https://source.unsplash.com/1400x700/?coronavirus" alt="" />
                    <div className="absolute z-20 rounded-xl top-0 p-5 text-3xl font-semibold tracking-wider w-full h-full bg-black bg-opacity-20 text-white flex">
                        <img src={`/images/que/coronavirus.jfif`} layout="fill" className="w-10 h-10 border-4 border-white shadow-xl hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
                        <p className="ml-2">Coronavirus</p>
                    </div>
                    <div className="z-30 absolute bottom-0 bg-white bg-opacity-50 w-full p-5 rounded-b-xl">
                        <div className="flex justify-between text-xl items-center">
                            <h1 className="text-blue-500 text-left"><span className="text-lg text-gray-600">Volume</span> <br /> $1424</h1>
                            <h2 className="text-gray-800 text-right"><span className="text-lg text-gray-600">Closing in</span><br /> 15 days</h2>
                        </div>
                        <div className="flex justify-around mt-4">
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-green-500">Yes</button>
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-red-500">No</button>
                        </div>
                    </div>
                </div>

                <div className="max-w-xs relative rounded-xl shadow-lg text-gray-700 font-medium text-lg">
                    <img className="w-full h-80 object-cover rounded-xl" src="https://source.unsplash.com/1400x700/?science" alt="" />
                    <div className="absolute z-20 rounded-xl top-0 p-5 text-3xl font-semibold tracking-wider w-full h-full bg-black bg-opacity-20 text-white flex">
                        <img src={`/images/que/science.jfif`} layout="fill" className="w-10 h-10 border-4 border-white shadow-xl hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
                        <p className="ml-2">Science</p>
                    </div>
                    <div className="z-30 absolute bottom-0 bg-white bg-opacity-50 w-full p-5 rounded-b-xl">
                        <div className="flex justify-between text-xl items-center">
                            <h1 className="text-blue-500 text-left"><span className="text-lg text-gray-600">Volume</span> <br /> $1424</h1>
                            <h2 className="text-gray-800 text-right"><span className="text-lg text-gray-600">Closing in</span><br /> 15 days</h2>
                        </div>
                        <div className="flex justify-around mt-4">
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-green-500">Yes</button>
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-red-500">No</button>
                        </div>
                    </div>
                </div>

                <div className="max-w-xs relative rounded-xl shadow-lg text-gray-700 font-medium text-lg">
                    <img className="w-full h-80 object-cover rounded-xl" src="https://source.unsplash.com/1400x700/?crypto" alt="" />
                    <div className="absolute z-20 rounded-xl top-0 p-5 text-3xl font-semibold tracking-wider w-full h-full bg-black bg-opacity-20 text-white flex">
                        <img src={`/images/que/crypto.jfif`} layout="fill" className="w-10 h-10 border-4 border-white shadow-xl hover:scale-105 transition-md object-cover rounded-full -translate-x-3 sm:-translate-x-0" />
                        <p className="ml-2">Crypto</p>
                    </div>
                    <div className="z-30 absolute bottom-0 bg-white bg-opacity-50 w-full p-5 rounded-b-xl">
                        <div className="flex justify-between text-xl items-center">
                            <h1 className="text-blue-500 text-left"><span className="text-lg text-gray-600">Volume</span> <br /> $1424</h1>
                            <h2 className="text-gray-800 text-right"><span className="text-lg text-gray-600">Closing in</span><br /> 15 days</h2>
                        </div>
                        <div className="flex justify-around mt-4">
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-green-500">Yes</button>
                            <button className="px-6 text-white font-semibold text-xl py-2 rounded-3xl bg-red-500">No</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Sample
