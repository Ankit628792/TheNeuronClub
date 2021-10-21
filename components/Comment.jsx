import { TrashIcon } from "@heroicons/react/solid"
import moment from "moment"

function Comment({ user, comment, onSelect }) {

    return (
        <>
            <div className="flex space-x-2 items-start justify-start">
                {comment?.image_url ?
                    <img src={comment?.image_url} alt="" className="w-12 h-12 border-4 border-gray-100 rounded-full" />
                    :
                    <div className="MuiAvatar-root MuiAvatar-circle gradient-bg text-white capitalize">
                        {comment?.name?.[0]}
                    </div>
                }
                <div className="shadow-md max-w-lg bg-white py-2 rounded-xl pl-4 pr-10 m-2 relative">
                    <h2 className="text-gray-800 text-sm">{comment?.name}</h2>
                    <h2 className="text-gray-500 text-xs">{moment(comment?.createdAt).format('ll')}</h2>
                    <div className="leading-normal my-1 text-base">{comment?.comment}</div>
                    {user == comment?.userId && <TrashIcon className="absolute top-1 right-2 text-red-500 w-5 h-5" onClick={() => onSelect(comment?._id)} />}
                </div>
            </div>
        </>
    )
}

export default Comment
