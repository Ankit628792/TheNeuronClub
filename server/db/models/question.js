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
    Volume: {
        type: Number,
    },
    Favour: {
        type: Number
    },
    Against: {
        type: Number
    },
    qstatus: {
        type: String,
    },
    options: {
        type: Array
    },
    reference: {
        type: String
    },
    desc: {
        type: String
    }
}, { timestamps: true })


const Question = mongoose.models.Question || mongoose.model('Question', questionSchema)

export default Question;