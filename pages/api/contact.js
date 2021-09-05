import connectDB from '../../db/mongodb';
import Contact from '../../db/models/contact';

const contacts = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;
        try {
            const userContact = new Contact({ name, email, message });
            const contactSaved = await userContact.save();
            res.status(201).send(contactSaved)
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(contacts);