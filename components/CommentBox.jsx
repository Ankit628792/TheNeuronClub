import { useState, useEffect } from 'react';
import Comment from './Comment'

function CommentBox({ queId, userId, image_url, name }) {
    const [userComments, setUserComments] = useState();
    const [isSending, setIsSending] = useState(false)
    const [comment, setComment] = useState('');

    const getComments = async () => {
        const res = await fetch(`/api/question/comment?queId=${queId}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            const response = await res.json();
            setUserComments([...response]);
        }
    }
    useEffect(() => {
        getComments()
    }, [])

    const delComment = async (id) => {
        const res = await fetch(`/api/question/comment?_id=${id}`, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 200) {
            const index = userComments.findIndex((comment) => comment._id == id)
            if (index >= 0) {
                userComments.splice(index, 1)
            } else {
                console.warn(`Can't remove comment`)
            }
            setUserComments([...userComments]);
        }
    }

    const postComment = async (e) => {
        e.preventDefault()
        setIsSending(true)
        const res = await fetch(`/api/question/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ queId, userId, image_url, name, comment: comment })
        })
        const response = await res.json();
        if (res.status == 201) {
            setComment('');
            userComments?.length > 0 ? setUserComments([response, ...userComments]) : setUserComments([response])
        }
        setIsSending(false)

    }

    return (
        <>
            {userId && <div className="flex space-x-2 sm:space-x-3 items-center justify-start">
                {image_url ?
                    <img src={image_url} alt="" className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-gray-100 rounded-full" />
                    :
                    <div className="MuiAvatar-root MuiAvatar-circle gradient-bg text-white capitalize">
                        {name?.[0]}
                    </div>
                }
                <form onSubmit={postComment} className="comment__box py-4 px-4 sm:px-6">
                    <h2 className="text-gray-600 text-lg font-medium">Add a new comment
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                    </h2>
                    <textarea className="bg-gray-50 rounded border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 my-2 placeholder-gray-700 focus:outline-none focus:bg-white sm:min-w-[300px]" name="comment" value={comment} placeholder='Type Your Comment' minLength="1" required onChange={(e) => setComment(e.target.value)}></textarea>

                    <button type="submit" className="btn-primary">{isSending ? 'Wait...' : 'Post'} </button>
                </form>
            </div>}

            {userComments?.length > 0 ?
                <>
                    <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold inline-block leading-relaxed text-gray-700 mt-3 mb-2">Comments </h1>
                    {userComments?.map(item => <Comment key={item?._id} user={userId} comment={item} onSelect={delComment} />)}
                </>
                :
                <>
                    <div className="text-center max-w-xs flex flex-col items-center justify-start">
                        <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold inline-block leading-relaxed text-gray-700 mt-3">No comments yet </h1>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                      {userId && <h1 className="text-lg transform -translate-y-7 inline-block leading-relaxed text-gray-700 mt-3">Be the first to comment </h1>}
                    </div>
                </>
            }
        </>
    )
}

export default CommentBox