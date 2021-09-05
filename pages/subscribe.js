import { useState } from 'react'
import Head from 'next/head'

function subscribe() {
    const [isSending, setIsSending] = useState(false)
    const [mail, setMail] = useState('')
    const [subscribed, setSubscribed] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const res = await fetch(`/api/newsletter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(mail)
          })
      
          const response = await res.json();
          if(response){
              setSubscribed(true);
          }
          setIsSending(false)
    }
    return (
        <>
            <div className="w-full min-h-[500px] pt-32 pb-10">
                <Head>
                    <title>TheNeuron | Subscribe</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                   
                        <div className="p-5 sm:px-10 max-w-3xl text-center bg-white mx-2 text-gray-700 mx-auto">
                            <h1 className="text-4xl md:text-5xl mb-3 font-semibold">Subscribe to Our Newsletter</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. We've built a next gen betting platform for you to bet on your opinion.</p>
                     
                           {subscribed ? <h1 className="text-3xl md:text-4xl mt-6 text-blue-500 font-bold">Thanks for Subscribing 🎉 </h1> : 
                            <div className="max-w-sm my-8 rounded-lg gradient-shadow mx-auto">
                                <form onSubmit={handleSubmit} className="flex">
                                <input type="email" className="flex-grow max-w-xs p-3 px-4 focus:outline-none focus:border focus:border-blue-500 placeholder-gray-400 font-normal" value={mail} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Type Your Email Address ..." onChange={(e) => setMail(e.target.value)} />
                                <button type="submit" className="px-6 py-3 text-lg text-white font-semibold gradient-bg">{isSending ? `Subscribing..` : `Subscribe`}</button>
                                </form>
                            </div>
        
                            }
                        </div>
            </div>
        </>
    )
}

export default subscribe
