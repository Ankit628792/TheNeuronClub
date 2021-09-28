import connectDB from '../../../server/db/mongodb'
import middleware from '../../../lib/uploadFile/middleware'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
    const image_url = `${process.env.HOST}/images/question/${req.file.filename}`
    const questionCreated = new Question({...req.body, image_url});
    const saveQuestion = await questionCreated.save();
    if (!saveQuestion) {
        res.status(400).send('Error');
    }
    else {
        res.status(201).send(questionCreated)
    }
})
export const config = {
    api: {
        bodyParser: false
    }
}

export default connectDB(handler)
