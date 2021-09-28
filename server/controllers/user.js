import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

import User from '../db/models/user'
import Transaction from '../db/models/transaction';

const userData = async (req, res) => {
    const userFound = await User.findById({ _id: req.query._id });
    if (!userFound) {
        res.status(400).send('Problem in getting user');
    }
    else {
        const questions = await Transaction.find({username: userFound.username}).sort({_id: -1})
        let { Tokens, password, ...other } = userFound._doc;
        other = {...other, questions}
        res.status(200).send(other)
    }
}

const update_user = async (req, res) => {
    const updatedUser = await User.updateMany({}, { balance: 50000 });
    if (updatedUser) {
        res.status(200).send(updatedUser)
    }
    else {
        res.status(400).send({ mg: "error" })
    }
}

export { userData, update_user }