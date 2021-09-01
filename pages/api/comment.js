import connectDB from '../../db/mongodb';
import Comment from '../../db/models/comment';

const comments = async (req, res) => {
    if (req.method === 'POST') {
        const { fullname, email, comment } = req.body;
        try {
            const userComment = new Comment({ fullname, email, comment });
            const commentRegistered = await userComment.save();
            res.status(201).send(commentRegistered)
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
}

export default connectDB(comments);