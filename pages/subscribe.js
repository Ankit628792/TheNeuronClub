import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

function subscribe() {
    const router = useRouter();
    const [isSending, setIsSending] = useState(false)
    const [mail, setMail] = useState()
    
    const subscribe = async () => {
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
              router.push('/');
          }
          setIsSending(false)
        
    }
    return (
        <>
            <div className="w-full min-h-[500px] pt-32">
                <Head>
                    <title>TheNeuron | Subscribe</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                   
                        <div className="p-5 sm:px-10 max-w-3xl text-center text-gray-700 mx-auto">
                            <h1 className="text-4xl md:text-5xl mb-3 font-semibold">Subscribe to Our Newsletter</h1>
                            <p className="text-lg md:text-xl">Join TheNeuron.club to bet directly on the outcome of events. We've built a next gen betting platform for you to bet on your opinion.</p>
                            <div className="flex max-w-md mt-8 rounded-lg gradient-shadow mx-auto">
                                <input type="text" className="flex-grow max-w-xs p-3 px-4 focus:outline-none focus:border focus:border-blue-500 placeholder-gray-400 font-normal" value={mail} required placeholder="Type Your Email Address ..." onChange={(e) => setMail(e.target.value)} />
                                <button className="px-6 py-3 text-lg text-white font-semibold gradient-bg" onClick={subscribe}>{isSending ? `Subscribing..` : `Subscribe`}</button>
                            </div>
                        </div>
            </div>
        </>
    )
}

export default subscribe
