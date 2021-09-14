import mongoose from 'mongoose';

const testquestionSchema = new mongoose.Schema({
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
    options: {
        type: Array
    },
    reference: {
        type: Array
    },
    desc: {
        type: Array
    }
}, { timestamps: true })


const testQ = mongoose.models.testQ || mongoose.model('testQ', testquestionSchema)

export default testQ;