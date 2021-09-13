
import Question from '../db/models/question'

const createQuestion = async (req, res) => {

    // const { question, userId, category, bidClosing, settlementClosing, qstatus, desc } = req.body;
    const questionCreated = new Question(req.body);
    const saveQuestion = await questionCreated.save();
    if (!saveQuestion) {
        res.status(400).send('Error');
    }
    else {
        res.status(201).send(questionCreated)
    }
}

const getQuestions = async (req, res) => {
    try {
        const getQuestions = await Question.find().sort({ _id: -1 });
        console.log(getQuestions)
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

export { createQuestion, getQuestions }