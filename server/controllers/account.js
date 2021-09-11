import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';
import Cookies from 'cookies'

import User from '../db/models/user'
const host = process.env.HOST

const sendEMail = async (data) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.zoho.in',
            secure: true,
            port: 465,
            auth: {
                user: process.env.mail_user,
                pass: process.env.mail_pass,
            },
            debug: true, // show debug output
            logger: true // log information in console
        })
        const mailData = {
            from: process.env.mail_user,
            to: `${data.email}`,
            subject: `${data.subject}`,
            text: `${data.text}`,
            html: `${data.html}`
        }
        await transporter.verify(function (error, success) {
            if (error) {
                console.log("error");
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });
        await transporter.sendMail(mailData, function (err, info) {
            if (err) {
                console.log(err)
            }
            else
                console.log(info)
        })
    }
    catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    const { username, email, password, country } = req.body;
    try {
        const userEmail = await User.findOne({ email: email });
        if (userEmail) {
            return res.status(421).json({ error: "Email already exist" })
        }
        const userUsername = await User.findOne({ username: username });
        if (userUsername) {
            return res.status(422).json({ error: "Username already exist" })
        } else {
            const user = new User({ username, email, password, country });
            try {
                user.isVerified = false;
                const userRegistered = await user.save();
                if (userRegistered) {
                    const token = await userRegistered.generateAuthToken();
                    const link = `${host}/account/verify?token=${token}`;
                    const data = { subject: `Confirmation for TheNeuron.Club Account`, text: link, email: userRegistered.email, html: `Click <a href="${link}" target="_blank">Here</a>  to verify your account.` };
                    sendEMail(data);
                    res.status(201).json({ message: "User registered successfully" });
                }

            } catch (error) {
                res.status(400).json({ error: 'Failed to register' })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

const verify = async (req, res) => {
    const { token } = req.query;
    const verifyToken = jwt.verify(token, process.env.secret_key);

    const userFound = await User.findById({ _id: verifyToken._id });
    if (!userFound) {
        res.status(400).send('Verification Link expired');
    }
    else {
        userFound.Tokens = []
        userFound.isVerified = true;
        await userFound.save();
        res.status(200).send({ msg: 'user verified' })
    }
}

const forgetPassword = async (req, res) => {
    const userFound = await User.findOne({ email: req.body }) || await User.findOne({ username: req.body })
    if (userFound) {
        const link = `${host}/account/reset_password?_id=${userFound._id}&username=${userFound.username}`;
        const data = { subject: `Reset Password request for TheNeuron.Club Account`, text: `Reset password`, email: userFound.email, html: `Click <a href="${link}" target="_blank">Here</a>  to reset password of your TheNeuron.Club account.` }
        sendEMail(data);
        res.status(200).send({ msg: 'Reset password request' })
    }
    else {
        res.status(400).send('Invalid User')
    }
}
const resetPassword = async (req, res) => {
    let { _id, username, password } = req.body;
    const userFound = await User.findOne({ _id: _id }) && await User.findOne({ username: username })
    if (userFound) {
        password = await bcrypt.hash(password, 12)
        const updateUser = await User.findByIdAndUpdate(_id, { password }, { new: true });
        updateUser.Tokens = []
        await updateUser.save();
        res.status(200).send({ msg: 'Password updated' })
    }
    else {
        res.status(400).send('Failed to update password')
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await User.findOne({ email: email }) || await User.findOne({ username: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            const token = await userLogin.generateAuthToken();
            const cookies = new Cookies(req, res)

            // Set a cookie
            cookies.set('jwtoken', token, {
                expires: new Date(Date.now() + 1000 * 60 * 10 * 6 * 24),
                httpOnly: true // true by default
            })
            if (!isMatch) {
                res.status(400).json({ error: 'Invalid Credentials' })
            } else {
                console.log(userLogin)
                if (userLogin.isVerified === false) {
                    res.status(203).send({ msg: 'User unverified' })
                } else {
                    res.status(200).send({ token });
                }
            }
        }
        else {
            res.status(401).json({ error: "User doesn't exist" })
        }
    } catch (error) {
        console.log(error)
    }

}

const logout = async (req, res) => {
    const cookies = new Cookies(req, res)

    // Get a cookie
    const token = cookies.get('jwtoken')
    const verifyToken = jwt.verify(token, process.env.secret_key);

    const userFound = await User.findById({ _id: verifyToken._id });
    if (!userFound) {
        res.status(400).send('Problem in Logout');
    }
    else {
        cookies.set('jwtoken')
        userFound.Tokens = []
        await userFound.save();
        res.status(200).send({ msg: 'Logout successfully' })
    }
}


export { register, login, verify, logout, forgetPassword, resetPassword }