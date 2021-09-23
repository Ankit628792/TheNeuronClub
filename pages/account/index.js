import { userSession } from "../../lib/user-session"
import { useState, useEffect } from 'react'
import QuestionGroup from "../../components/QuestionGroup";
import Loader from "../../components/Loader";

function index() {
    const session = userSession();
    const [userData, setUserData] = useState(null)
    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        console.log(res.status)
        const response = await res.json();
        setUserData(response)
    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className="pt-28 pb-10 xl:px-10 w-full min-h-screen flex flex-col-reverse xl:flex-row items-start justify-between">
            {userData ?
                <>
                    <QuestionGroup questions={userData?.questions} category={"Question Transaction"} user={true} />
                    <div className="max-w-sm gradient-shadow-md rounded-xl px-4 py-6 space-y-2 mx-auto min-w-[300px]">
                        <div className="w-20 h-20 mx-auto border-8 pb-1 border-white shadow-md hover:shadow-lg rounded-full gradient-bg font-bold text-5xl grid place-items-center text-white">
                            {userData?.username && userData?.username[0]}
                        </div>
                        <div className="flex text-lg items-center justify-between space-x-1">
                            <h1 className="font-medium">Username:</h1> <h2>{userData?.username}</h2>
                        </div>
                        <div className="flex text-lg items-center justify-between space-x-1">
                            <h1 className="font-medium">Email:</h1> <h2 className="break-all leading-5">{userData?.email}</h2>
                        </div>
                        <div className="flex text-lg items-center justify-between space-x-1">
                            <h1 className="font-medium">Country:</h1> <h2>{userData?.country}</h2>
                        </div>
                        <div className="flex text-lg items-center justify-between space-x-1">
                            <h1 className="font-medium">Balance:</h1> <h2>${userData?.balance}</h2>
                        </div>
                    </div>
                </>
                :
                <Loader />
            }
        </div>
    )
}

export default index
