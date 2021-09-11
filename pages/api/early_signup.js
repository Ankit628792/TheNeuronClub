import connectDB from '../../server/db/mongodb';
import EarlySignup from '../../server/db/models/earlySignup';
const nodemailer = require('nodemailer')

const sendMail = (emailRegistered) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            secure: true,
            port: 465,
            auth: {
                user: `dev@theneuron.club`,
                pass: `Club1234567890`,
            },
        })
        const mailData = {
            from: `dev@theneuron.club`,
            to: `ankit628792@gmail.com`,
            subject: `New Signup`,
            text:   " Sent from: " + emailRegistered,
            html: `<div>${emailRegistered.email} recently Sign Up The Neuron club</div>`
        }

        transporter.sendMail(mailData, function (err, info) {
            if (err){
                console.log(err)
                res.status(301).send({ms: 'error', ss: emailRegistered})
            }
            else
            {
                res.status(302).send({ms: 'sent', ss: emailRegistered})
                console.log(info)
            }
        })
       
    }
    catch (error) {
        console.log(error)
    }
}

const early_signup = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const earlySignup = new EarlySignup({ email:req.body});
            const emailRegistered = await earlySignup.save();
            if(emailRegistered){
                sendMail(emailRegistered)
            }
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
