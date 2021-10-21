import { TrashIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import Comment from './Comment'

function CommentBox({ queId, userId, image_url, name }) {
    const [userComments, setUserComments] = useState([]);
    const [data, setData] = useState({
        queId: queId,
        userId: userId,
        image_url: image_url,
        name: name,
        comment: ''
    });
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getComments = async () => {
        const res = await fetch(`api/question/comment?queId=${queId}`, { method: 'GET' })
        if (res.status === 200) {
            const response = await res.json();
            setUserComments(response);
        }
    }
    useEffect(() => {
        getComments()
    }, [])

    const delComment = async (id) => {
        const res = await fetch(`api/question/comment?_id=${id}`, { method: 'DELETE' })
        if (res.status === 200) {
            const index = userComments.findIndex((comment) => comment._id == id)
            if (index >= 0) {
                userComments.splice(index, 1)
            } else {
                console.warn(`Can't remove Book`)
            }
            setUserComments(userComments);
        }
    }

    const postComment = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/question/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await res.json();
        if (res.status == 201) {
            setUserComments([response, ...userComments])
        }
    }

    return (
        <>
            {/* Comment form  */}
            {userId && <div className="flex space-x-2 items-start justify-start">
                {image_url ?
                    <img src={image_url} alt="" className="w-12 h-12 border-4 border-gray-100 rounded-full" />
                    :
                    <div className="MuiAvatar-root MuiAvatar-circle gradient-bg text-white capitalize">
                        {name?.[0]}
                    </div>
                }
                <form onSubmit={postComment} className="w-full max-w-lg shadow-md bg-white py-4 px-5 m-2 relative">
                    <h2 className="text-gray-800 text-lg">Add a new comment</h2>
                    <textarea className="bg-gray-50 rounded border border-gray-300 leading-normal resize-none w-full h-20 py-2 px-3 my-2 placeholder-gray-700 focus:outline-none focus:bg-white" name="comment" placeholder='Type Your Comment' minLength="1" required onChange={handleChange}></textarea>

                    <button type="submit" className="btn-primary">Post Comment </button>
                </form>
            </div>}

            {userComments?.length > 0 && userComments?.map(item => <Comment key={item?._id} user={userId} comment={item} onSelect={delComment} />)}
        </>
    )
}

export default CommentBox
