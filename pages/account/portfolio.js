
import { userSession } from "../../lib/user-session"
import { useState, useEffect } from 'react'
import Loader from "../../components/Loader";
import Router from 'next/router'
import Head from 'next/head'
import Coin from "../../components/Coin";
import Notification from "../../components/Notification";
import { motion } from "framer-motion";
import { container, pageTransition, pageZoom } from "../../util";
import Row from "../../components/Row";

function portfolio() {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])
    const [userData, setUserData] = useState(null);
    const [investment, setInvestment] = useState({
        total: 0
    });
    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        console.log(res.status)
        const response = await res.json();
        setUserData(response)
    }
    useEffect(() => {
        getUser();
    }, []);

    function getTotal(items, prop) {
        if (items) {
            return items.reduce(function (a, b) {
                return a + b[prop];
            }, 0);
        }
    };

    useEffect(() => {
        setInvestment({
            total: getTotal(userData?.questions, 'amount')
        })
    }, [userData]);

    return (
        <div className="py-10 xl:px-10 w-full min-h-screen">
            <Head> <title>The Neuron Club | Portfolio</title> </Head>
            {userData ?
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto text-right max-w-7xl">
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow bg-gray-200 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl p-6 m-2 space-y-2 border-b-4 invest__border">
                            <h1 className="font-semibold text-2xl text-white">Investment</h1>
                            <h2 className="text-xl text-gray-200 inline-flex items-center"><Coin width="5" height="5" />{Math.round(investment?.total)}</h2>
                        </motion.div>
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow bg-green-200 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl p-6 m-2 space-y-2 border-b-4 win__border">
                            <h1 className="font-semibold text-2xl text-white">Net Returns</h1>
                            <h2 className="text-xl text-gray-200 inline-flex items-center"><Coin width="5" height="5" />{Math.round(userData?.earning) || '0'}</h2>
                        </motion.div>
                        <motion.div initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageZoom}
                            transition={pageTransition} className="max-w-xs gradient-shadow bg-blue-200 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl p-6 m-2 space-y-2 border-b-4 balance__border">
                            <h1 className="font-semibold text-2xl text-white">Balance</h1>
                            <h2 className="text-xl text-gray-200 inline-flex items-center"><Coin width="5" height="5" />{Math.round(userData?.balance)}</h2>
                        </motion.div>
                        <div className="hidden xl:inline-block col-span-2 md:col-span-1 m-2">
                            <motion.div initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageZoom}
                                transition={pageTransition} className="max-w-[300px] mx-auto gradient-shadow bg-gray-200 bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl p-6 space-x-4 flex items-center border-b-4 info__border">

                                <div className="w-16 h-16 mx-auto border-8 flex-shrink-0 pb-1 border-white shadow-md hover:shadow-lg rounded-full btn-blue font-bold text-4xl grid place-items-center text-white">
                                    {session?.image_url ?
                                        <img className="w-full h-full object-cover rounded-full" src={session?.image_url} alt="" />
                                        : session?.name?.[0]}
                                </div>
                                <div className="text-xl font-medium text-white">
                                    <h2 className="line-clamp-1">{session?.name}</h2>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {userData?.questions?.length > 0 ?
                        <>
                        <div className={`p-5 py-10 sm:p-10 xl:px-20 min-w-full mx-auto`}>
                            <div className="flex justify-start border-b-2 mb-4 pb-2 border-gray-200">
                                <h1 className="text-2xl sm:text-3xl font-semibold  text-white">Question Transactions</h1>
                            </div>
                            <div className="flex flex-col w-full overflow-x-scroll max-w-[90vw]">
                                <table className="divide-y divide-gray-200">
                                    <thead className="blur-blue text-white">
                                        <tr>
                                            <th scope="col" className="p-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-center">
                                                Category
                                            </th>
                                            <th scope="col" className="p-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-center">
                                                Question
                                            </th>
                                            <th scope="col" className="p-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-center">
                                                Bid-Date
                                            </th>
                                            <th scope="col" className="p-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-center">
                                                Investment
                                            </th>
                                            <th scope="col" className="p-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-center">
                                                Status
                                            </th>
                                            <th scope="col" className="p-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-center">
                                                Result
                                            </th>

                                        </tr>
                                    </thead>
                                    <motion.tbody
                                        initial="hidden"
                                        animate="visible"
                                        variants={container}
                                        transition={pageTransition} className="divide-y text-gray-50 overflow-auto">
                                        {
                                            (userData?.questions && userData?.questions?.length > 0) ?
                                                <>
                                                    {userData?.questions.map((item, i) => (
                                                        <Row question={item} key={i} />
                                                    ))}
                                                </>
                                                :
                                                <>
                                                    <td>
                                                        <div className="p-5 mx-auto relative min-w-[350px] min-h-[350px]">
                                                            <Image src="/images/no-data.svg" layout="fill" objectFit="contain" className="w-full h-full drop-shadow" />
                                                        </div>
                                                    </td>
                                                </>
                                        }
                                    </motion.tbody>
                                </table>
                            </div>
                            </div>
                        </>
                        :
                        <div className="text-center p-5">
                            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-white my-6">You've not placed any bid yet.</h1>
                            <button onClick={() => Router.push('/question/')} className="px-5 py-3 btn-blue text-lg lg:text-xl text-white rounded-xl font-semibold active:scale-95 transition-sm">Place a Bid</button>
                        </div>
                    }
                    <Notification notifications={userData?.notification} />
                </>
                :
                <Loader />
            }
        </div>
    )
}

export default portfolio
