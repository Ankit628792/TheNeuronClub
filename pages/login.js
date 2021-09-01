import { LockClosedIcon, MailIcon, UserIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'

function login() {
    return (
        <>
            <div className="min-h-screen w-full">
                <Head>
                    <title>TheNeuron | Login</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="md:flex relative min-h-screen">
                    <div className="relative min-h-[300px] p-7 gradient-bg w-full flex flex-col items-center justify-end md:justify-center">
                        <h1 className="absolute top-5 left-5 text-white text-3xl lg:text-4xl font-bold">LOGO.</h1>
                        <div className="max-w-sm lg:max-w-md text-white">
                            <h1 className="text-3xl md:text-5xl mb-3 font-semibold">Start Betting Now</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. We've built a next gen betting platform for you to bet on your opinion.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center">
                        <form className="max-w-lg p-10">
                            <div className="flex border-b-2 border-gray-700 py-2 my-6">
                                <MailIcon className="h-6" />
                                <input className="outline-none flex-grow px-2" type="text" placeholder="Your Mail Id or User Name" />
                            </div>
                            <div className="flex border-b-2 border-gray-700 py-2 my-6">
                                <LockClosedIcon className="h-6" />
                                <input className="outline-none flex-grow px-2" type="text" placeholder="Password " />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input className="w-4 h-4" type="checkbox" />
                                <h1>Remember me</h1>
                            </div>

                            <button className="w-full px-6 py-3 text-lg text-white font-semibold rounded-md my-4 gradient-bg">Login</button>
                            <h1>Don't have an account ? <a href="/register" className="text-blue-500 font-medium">Register</a></h1>
                            <div className="flex space-x-6 sm:px-5 mt-5">
                                <div className="px-4 py-2 border border-gray-700 text-gray-700 font-semibold cursor-pointer hover:bg-gray-800 hover:text-white rounded-full transition duration-100 ease-linear">
                                    Google G+
                                </div>
                                <div className="px-4 py-2 border border-gray-700 text-gray-700 font-semibold cursor-pointer hover:bg-gray-800 hover:text-white rounded-full transition duration-100 ease-linear">
                                    Facebook F+
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login
