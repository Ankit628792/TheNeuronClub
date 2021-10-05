import Question from '../db/models/question'

const createQuestion = async (req, res) => {
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
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}

const queDetail = async (req, res) => {
    console.log(req.query)
    const detail = await Question.findById({ _id: req.query._id });
    if (detail) {
        res.status(200).send(detail)
    }
    else {
        res.status(400).send({ mg: "error" })
    }
}


const update_que = async (req, res) => {
    const { _id, bidClosing, settlementClosing, desc } = req.body
    const updatedq = await Question.findByIdAndUpdate({ _id: _id }, { bidClosing, settlementClosing, desc }, {new: true});
    if (updatedq) {
        res.status(200).send(updatedq)
    }
    else {
        res.status(400).send({ mg: "error" })
    }
}


const filter = async (req, res) => {
    const { category, sort } = req.body;
    let sorting, filter;
    category && category.length > 2 ? (filter = { category }) : (filter = null)
    if (sort === 'volume') {
        sorting = { id: -1 }
    }
    else if (sort === 'oldest') {
        sorting = { createdAt: 0 }

    } else if (sort === 'closing') {
        sorting = { bidClosing: 0 }
    }
    else {
        sorting = { createdAt: -1 }
    }
    try {
        const getQuestions = await Question.find(filter).sort(sorting);
        res.status(200).send(getQuestions)
    } catch (error) {
        res.status(400).send({ msg: 'unable to get question' })
    }
}


export { createQuestion, getQuestions, filter, queDetail, update_que }