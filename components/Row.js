import moment from 'moment'
import Router from 'next/router'

function Row({question}) {
    const handleClick = () => {
        Router.push({
            pathname: `/question/${question?.questionId}`,
        })
    }
    return (
        <>
            <tr className="hover:bg-blue-50 transition delay-75 cursor-pointer" onClick={handleClick}>
                <td class="p-4 whitespace-nowrap">
                    <div class="flex items-center flex-col sm:flex-row">
                        <div class="flex-shrink-0 h-10 w-10 m-2">
                            <img class="h-10 w-10 rounded-full shadow-lg border-2 border-white" src={`/images/que/${question?.category.toLowerCase()}.jfif`} alt="" />
                        </div>
                        <div class="sm:ml-4">
                            <div class="text-sm sm:text-base font-medium text-gray-900">
                                {question?.category}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <div class="text-sm sm:text-base text-gray-900 max-w-sm min-w-[384px] break-words">{question?.question}</div>
                </td>
                <td class="p-4 whitespace-nowrap text-sm sm:text-base text-gray-600">
                {moment(question?.createdAt).format('lll')}
                </td>
                <td class="p-4 whitespace-nowrap text-sm sm:text-base text-gray-600 text-center">
                    ${question?.amount}
                </td>
                <td class="p-4 whitespace-nowrap text-center">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                    </span>
                </td>
            </tr>
        </>
    )
}

export default Row