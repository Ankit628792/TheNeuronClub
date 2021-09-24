import { userSession } from "../../lib/user-session"
import { useState, useEffect } from 'react'
import QuestionGroup from "../../components/QuestionGroup";
import Loader from "../../components/Loader";

function index() {
    const session = userSession();
    const [userData, setUserData] = useState(null);
    const [investment, setInvestment] = useState({
        total: 0,
        win: 0,
        lose: 0
    });
    const getUser = async () => {
        const res = await fetch(`/api/user/getUser?_id=${session?._id}`);
        console.log(res.status)
        const response = await res.json();
        setUserData(response)
    }
    useEffect(() => {
        getUser();
    }, []);

    function getTotal(items, prop) {
        if (items) {
            return items.reduce(function (a, b) {
                return a + b[prop];
            }, 0);
        }
    };

    useEffect(() => {
        setInvestment({
            total : getTotal(userData?.questions, 'amount'),
            win: 0,
            lose: 0
        })
    }, [userData]);

    return (
        <div className="pt-28 pb-10 xl:px-10 w-full min-h-screen flex flex-col-reverse xl:flex-row items-start justify-between">
            {userData ?
                <>
                    <QuestionGroup questions={userData?.questions} category={"Question Transaction"} user={true} />
                    <div className="mx-auto sm:flex sm:space-x-4 xl:flex-col space-x-0 space-y-4 sm:space-y-0 xl:space-y-5">
                        <div className="max-w-sm gradient-shadow rounded-xl p-6 space-y-2">
                            <div className="w-20 h-20 mx-auto border-8 pb-1 border-white shadow-md hover:shadow-lg rounded-full gradient-bg font-bold text-5xl grid place-items-center text-white">
                                {userData?.username && userData?.username[0]}
                            </div>
                            <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium">Username:</h1> <h2>{userData?.username}</h2>
                            </div>
                            {/* <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium">Email:</h1> <h2 className="break-all leading-5">{userData?.email}</h2>
                            </div>
                            <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium">Country:</h1> <h2>{userData?.country}</h2>
                            </div> */}
                            <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium">Balance:</h1> <h2>${userData?.balance}</h2>
                            </div>
                        </div>

                        <div className="max-w-sm gradient-shadow rounded-xl p-6 space-y-3 ">
                            <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium leading-5">Total Investment:</h1> <h2>${investment?.total}</h2>
                            </div>
                            <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium">Total Win:</h1> <h2>${investment?.win}</h2>
                            </div>
                            <div className="flex text-lg items-center justify-between space-x-1">
                                <h1 className="font-medium">Total Lose:</h1> <h2>${investment?.lose}</h2>
                            </div>
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
