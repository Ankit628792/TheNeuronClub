import { useState } from 'react'
import { motion } from 'framer-motion'
import { pageTransition, pageZoom } from '../util'

export const UndoSettle = ({ queId, finalResult, setIsUndoSettle, setQue }) => {
    const [isSending, setIsSending] = useState(false)
    const handleUndo = async () => {
        setIsSending(true)
        const res = await fetch(`/api/transaction/undoSettlement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: queId, result: finalResult })
        })
        console.log(res.status)
        const response = await res.json();
        if (res.status == 200) {
            setQue(response)
            setIsUndoSettle(false)
        }
        setIsSending(false)
    }
    return (
        <>
            {<motion.div initial="initial"
                animate="in"
                exit="out"
                variants={pageZoom}
                transition={pageTransition} className="fixed inset-0 w-full h-full grid place-items-center z-50 blur-black max_w_3xl" >
                <div className="relative max-w-sm md:max-w-md py-10 md:py-14 px-5 md:px-10 blur-gray text-white rounded-xl shadow-2xl m-4">
                    <h1 className="text-xl md:text-2xl my-4 text-center font-medium z-50 leading-tight">
                        Do you want to undo settlement for this question ?
                    </h1>
                    <div className="flex items-center justify-around mt-6">
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose text-gray-50 border border-gray-50 hover:bg-gray-50 hover:text-gray-800 shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={() => setIsUndoSettle(false)}>{'Cancel'}</button>
                        <button className="px-3 py-1 mt-2 mb-2 mx-auto leading-loose btn-blue text-white shadow text-lg rounded font-semibold active:scale-95 transition duration-150 ease-in-out focus:outline-none focus:border-none min-w-[100px]" onClick={handleUndo} disabled={isSending}>{isSending ? 'Wait...' : 'Confirm'}</button>
                    </div>
                </div>
            </motion.div>}
        </>
    )
}