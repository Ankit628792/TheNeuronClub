import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    username: {
        type: String
    },
    questionId: {
        type: String
    },
    amount: {
        type: Number
    },
    question: {
        type: String
    },
    category: {
        type: String
    },
    result: {
        type: String
    },
    odd: {
        type: String
    },
    settlementClosing: {
        type: String
    }
}, { timestamps: true })


const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export default Transaction;