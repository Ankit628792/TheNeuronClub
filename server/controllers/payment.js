import Withdraw from "../db/models/withdraw";
import User from "../db/models/user";
import sendEMail from "../../lib/Mail/sendMail";

const withdrawCoins = async (req, res) => {
    try {
        const data = JSON.parse(req.body)
        const userFound = await User.findById({ _id: data?.userId });
        if (!userFound) {
            res.status(400).send('Problem in getting user');
        }
        else {
            try {
                const requestPay = new Withdraw(JSON.parse(req.body));
                const saveRequest = await requestPay.save();
                const link = `${saveRequest?.name} Requested for Withdrawal`;
                const data = { subject: `Request for Withdrawal`, text: link, email: saveRequest.email, html: `${saveRequest}` };
                const result = await sendEMail(data);
                console.log(result);
                res.status(200).send({ message: 'Your Withdrawal Request is Sent Successfully', newBalance: userFound?.balance - saveRequest?.coins })
            } catch (error) {
                console.log(error)
                res.status(402).send('Problem in sending request')
            }

        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Problem in getting user');
    }
}




export { withdrawCoins }