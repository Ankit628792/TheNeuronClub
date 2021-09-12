import jwt from 'jsonwebtoken'
import Cookies from 'cookies'

import User from '../db/models/user'

const getUser = async (req, res) => {
    const cookies = new Cookies(req, res)

    // Get a cookie
    const token = cookies.get('jwtoken')
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    const userFound = await User.findById({ _id: verifyToken._id });
    if (!userFound) {
        res.status(400).send('Problem in Logout');
    }
    else {
        const { Tokens,password, ...other } = userFound._doc;
        res.status(200).send(other)
    }
}

export {getUser}