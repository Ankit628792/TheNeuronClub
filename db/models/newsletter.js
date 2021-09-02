import mongoose from 'mongoose';

const newsLetter = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
})

const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsLetter);

export default Newsletter;