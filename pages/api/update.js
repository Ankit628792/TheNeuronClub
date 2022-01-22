
import connectDB from '../../server/db/mongodb';
import Question from '../../server/db/models/question';

const update = async (req, res) => {
    try {
        const q = await Question.findById({_id: ''})
        res.status(201).send('updated')
    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB(update);
