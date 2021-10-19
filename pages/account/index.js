import { userSession } from "../../lib/user-session"
import { useState, useEffect } from 'react'
import QuestionGroup from "../../components/QuestionGroup";
import Loader from "../../components/Loader";
import Router from 'next/router'
import Head from 'next/head'
import Coin from "../../components/Coin";
import Notification from "../../components/Notification";
import { motion } from "framer-motion";
import { pageTransition, pageZoom } from "../../util";
import Portfolio from "../../components/Portfolio";

function index() {
    const session = userSession();
    useEffect(() => {
        if (!session) {
            Router.push('/')
        }
    }, [session])

    return (
        <div className="py-10">
            <Head> <title>The Neuron | Portfolio</title> </Head>
            {session ?
                <>
                    <Portfolio />
                    {/* <Notification notifications={userData?.notification} /> */}
                </>
                :
                // <Loader />
                'hello'
            }
        </div>
    )
}

export default index
