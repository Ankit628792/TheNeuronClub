import Head from "next/head"
import CreateQ from "../components/CreateQ"

function create_question() {
    return (
        <>
            <Head>
                <title>The Neuron | Create Question</title>
            </Head>
            <CreateQ />
        </>
    )
}

export default create_question
