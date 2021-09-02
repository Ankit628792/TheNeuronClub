import connectDB from '../../../db/mongodb';
import User from '../../../db/models/user';
import * as bcrypt from 'bcryptjs'

const signin = async (req, res) => {
    if (req.method === 'GET') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Fill all the fields" })
        }
    
        try {
            const userLogin = await User.findOne({ email: email })
            if (userLogin) {
                const isMatch = await bcrypt.compare(password, userLogin.password)
    
                const token = await userLogin.generateAuthToken();
    
                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 1000 * 60 * 10 * 6 * 24 * 28),
                    httpOnly: true
                })
    
                if (!isMatch) {
                    res.status(400).json({ error: 'Invalid Credentials' })
                } else {
                    res.status(200).json({ message: 'User authenticated' });
                }
            }
            else {
                res.status(401).json({ error: "User doesn't exist" })
            }
        } catch (error) {
            console.log(error)
        }
    
    }
}
export default connectDB(signin);
