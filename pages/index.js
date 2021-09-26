import Head from 'next/head'
import Header from '../components/Header'
import QuestionGroup from '../components/QuestionGroup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home({ questions }) {
  toast("🦄 Wow, You've won 1000 Neuron coins! 🥳", {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-between pb-10">
        <Head>
          <title>The Neuron</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <QuestionGroup questions={questions.slice(0, 8)} category={"Trending Topics"} />
        <QuestionGroup questions={questions.slice(8, 16)} category={"New Topics"} />
      </div>
      <ToastContainer style={{textAlign: 'center'}} />
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

