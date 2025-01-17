import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image_url: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    balance: {
        type: Number,
        default: 200
    },
    earning: {
        type: Number,
        default: 0
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
    },
    referred_user: {
        type: Array
    },
    referral_code: {
        type: String,
    },
    referred_through: {
        type: String,
    },
    lastVisit: {
        type: String,
    },
    type: {
        type: String,
        default: 'user'
    },
    notification: {
        type: Array,
        default: ["🦄 Wow, You've won 200 Neuron coins! 🥳"]
    },
    Tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id, username: this.username, name: this.name, email: this.email, isVerified: this.isVerified, country: this.country, name: this.name, type: this.type, referral_code: this.referral_code, image_url: this.image_url }, process.env.secret_key)
        this.Tokens = this.Tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;