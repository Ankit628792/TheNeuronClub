import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

import User from '../db/models/user'
import Question from '../db/models/question'
import Transaction from '../db/models/transaction'

const question = async (req, res) => {
    const { Volume, Favour, Againt, question, _id, category, odd, bid, username, settlementClosing, image_url } = req.body
    try {
        const createTransaction = new Transaction({ username, amount: bid, questionId: _id, question, category, odd, settlementClosing, image_url });
        const transactionRegistered = await createTransaction.save();
        if (transactionRegistered) {
            const updatedUser = await User.findOneAndUpdate({ username: username }, { $inc: { balance: -bid } }, { new: true },);
            if (updatedUser) {
                const updatedq = odd=='Favour' ? await Question.updateOne({_id: _id}, { $inc: { Volume: bid, Favour: bid } }, { new: true }) : await Question.updateOne({_id: _id}, { $inc: { Volume: bid, Against: bid } }, { new: true });
                if (updatedq) {
                    const updatedQuestion = await Question.findOne({_id: _id}) ;
                    res.status(201).send(updatedQuestion)
                }
                else {
                    res.status(400).send({ mg: "error" })
                }
            }
            else {
                res.status(400).send({ mg: "error" })
            }
        }

    } catch (error) {
        res.status(400).json({ error: 'Transaction Failed' })
    }
}

export { question }