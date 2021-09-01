import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
    },
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    cpassword : {
        type: String,
    },
    Tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ]
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id: this._id}, process.env.secret_key)
        this.Tokens = this.Tokens.concat({token: token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User ;