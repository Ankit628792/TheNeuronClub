import { useRouter } from 'next/router'
import React from 'react'
import QuestionList from '../components/QuestionList'

function contest() {
    const router = useRouter()
    return (
        <>
            <div>
                <img className='h-96 w-full rounded max-w-7xl object-cover mx-auto m-5'  src="https://images.unsplash.com/photo-1638913976954-8f7b612867c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
            </div>
            <QuestionList category={router.query?.category || 'sports'} contest />
        </>
    )
}

export default contest