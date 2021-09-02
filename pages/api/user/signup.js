import connectDB from '../../../db/mongodb';
import User from '../../../db/models/user';

const signout = async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password, cpassword } = req.body;

    if (!username || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the fields" })
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(420).json({ error: "Email already exist" })
        } else if (password !== cpassword) {
            return res.status(421).json({ error: "Invalid Credential" })
        } else {
            const userId = new Date().getTime().toString();
            const user = new User({ userId, username, email, password, cpassword });
            try {
                const userRegister = await user.save()
                res.status(201).json({ message: "User registered successfully" });
            } catch (error) {
                res.status(400).json({ error: 'Failed to register' })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
    }
}

export default connectDB(signout);