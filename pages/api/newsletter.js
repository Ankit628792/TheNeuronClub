import connectDB from '../../db/mongodb';
import Newsletter from '../../db/models/newsletter';

const newsletter = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const newsLetter = new Newsletter({ email:req.body});
            const emailRegistered = await newsLetter.save();
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

export default connectDB(newsletter);