import Head from 'next/head'
import Header from '../components/Header'
import QuestionGroup from '../components/QuestionGroup'
export default function Home({ questions }) {

  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-between">
        <Head>
          <title>The Neuron</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <QuestionGroup questions={questions.slice(0, 9)} category={"Popular"} />
        <QuestionGroup questions={questions.slice(7, 16)} category={"Recent"} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const questions = await fetch('https://sample-api-data.vercel.app/api/tnc/questions').then((res) => res.json());

  return {
    props: {
      questions
    }
  }
}

