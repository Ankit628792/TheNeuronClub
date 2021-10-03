import Head from 'next/head'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Header from '../components/Header'
import QuestionGroup from '../components/QuestionGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from '../components/Carousel'

export default function Home({ questions }) {

  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('neuron-newUser'));
    if (data === true) {
      toast("🦄 Wow, You've won 1000 Neuron coins! 🥳", {
        position: "top-center",
        autoClose: 100000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsNewUser(true);
    }
    window.localStorage.setItem('neuron-newUser', false)
  }, [])
  return (
    <>
      {isNewUser && <Carousel />}
      <div className="min-h-screen w-full flex flex-col justify-between pb-10">
        <Head>
          <title>The Neuron</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <QuestionGroup questions={questions?.slice(0, 8)} category={"Trending Topics"} />
        <QuestionGroup questions={questions?.slice(8, 16)} category={"New Topics"} />
      </div>
      <ToastContainer style={{ textAlign: 'center' }} onClick={() => Router.push('/account/')} />
    </>
  )
}

export async function getStaticProps() {
  // const questions = await fetch('https://sample-api-data.vercel.app/api/tnc/questions').then((res) => res.json());
  const questions = await fetch(`${process.env.HOST}/api/question/get_questions`).then((res) => res.json());
  return {
    props: {
      questions
    }
  }
}

