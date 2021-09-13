import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    bidClosing: {
        type: String,
    },
    settlementClosing: {
        type: String,
    },
    qstatus: {
        type: String,
    },
    reference: {
        type: Array
    },
    desc: {
        type: Array
    }
}, { timestamps: true })


const Question = mongoose.models.Question || mongoose.model('Question', questionSchema)

export default Question;