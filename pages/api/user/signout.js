import connectDB from '../../../db/mongodb';
import * as jwt from 'jsonwebtoken'

const signout =  async (req, res) => {
    if (req.method === 'GET') {
        try {
            const token = req.cookies.jwtoken;
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    
            const rootUser = await User.findOne({ _id: verifyToken._id });
    
            if (!rootUser) {
                res.status(400).send('User not found')
            }
            res.clearCookie('jwtoken', { path: '/' })
            rootUser.Tokens = []
            await req.rootUser.save();
            res.status(200).send("Signout")
        } catch (error) {
            console.log(error)
            res.status(400).send("Error in signout")
        }
    }
}

export default connectDB(signout);
