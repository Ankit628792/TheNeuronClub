import { TrashIcon } from "@heroicons/react/solid"
import moment from "moment"
import motion from 'framer-motion'
import { pageTransition, pageZoom } from "../util"

function Comment({ user, comment, onSelect }) {

    return (
        <>
            <motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="flex space-x-2 sm:space-x-3 items-center justify-start">
                {comment?.image_url ?
                    <img src={comment?.image_url} alt="" className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-gray-100 rounded-full" />
                    :
                    <div className="MuiAvatar-root MuiAvatar-circle gradient-bg text-white capitalize">
                        {comment?.name?.[0]}
                    </div>
                }
                <div className="comment__box py-2 pl-4 pr-10 sm:pl-6 sm:pr-14">
                    <h2 className="text-gray-600 font-medium text-sm">{comment?.name}</h2>
                    <h2 className="text-gray-400 text-xs">{moment(comment?.createdAt).format('ll')}</h2>
                    <div className="leading-normal text-gray-800 my-1 text-base break-words break-all">{comment?.comment}</div>
                    {user == comment?.userId && <TrashIcon className="absolute top-2 right-2 cursor-pointer text-red-500 w-5 h-5" onClick={() => onSelect(comment?._id)} />}
                </div>
            </motion.div>
        </>
    )
}

export default Comment
