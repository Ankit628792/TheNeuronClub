import connectDB from '../../../db/mongodb';
import User from '../../../db/models/user';

const user = async (req, res) => {
    if (req.method === 'GET') {
        const userId = req.query.userId;
        // const email = req.query.email;
        try {
            const user = await User.findOne({ userId: userId })
            // : await User.findOne({ email: email });
            const { password, cpassword, Tokens, ...other } = user._doc;
            res.status(200).send(other)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}
export default connectDB(user);