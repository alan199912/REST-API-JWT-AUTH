import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId // one to many relationship
    }]
}, {
    timestamps: true,
    versionKey: false
})

// encrypt password
userSchema.statics.encryptPassword = async (password) => {
    
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

// compare password
userSchema.statics.comparePassword = async (password, receivedPass) => {

    return await bcrypt.compare(password, receivedPass)

}


export default model('User', userSchema)