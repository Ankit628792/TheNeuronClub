import connectDB from '../../server/db/mongodb';
import EarlySignup from '../../server/db/models/earlySignup';
import nodemailer from 'nodemailer';
const sendEMail = async (email) => {
    console.log(email)
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            secure: true,
            port: 465,
            auth: {
                user: process.env.mail_user,
                pass: process.env.mail_pass,
            },
        })

        const mailData = {
            from: process.env.mail_user,
            to: process.env.mail_to,
            subject: `New Signup`,
            text: " Sent from: " + email,
            html: `<div>${email} recently Sign Up The Neuron club</div>`
        }

        transporter.verify(function (error, success) {
            if (error) {
                console.log("error");
                console.log(error);
            } else {
                console.log(success)
                console.log('Server is ready to take our messages');
            }
        });

        const info = await transporter.sendMail(mailData);
        console.log("result : ", info);
        return 'message sent to ak'

    }
    catch (error) {
        console.log(error)
    }
}

const early_signup = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const earlySignup = new EarlySignup({ email: req.body });
            const emailRegistered = await earlySignup.save();
            const result = await sendEMail(emailRegistered.email);
            console.log(result)
            res.status(201).send(emailRegistered)
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(early_signup);
