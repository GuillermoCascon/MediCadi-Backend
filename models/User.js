import mongoose from "mongoose";
import generateId from "../helpers/generateId.js";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }, 
    password: {
        type: String, 
        requiered: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    token: {
        type: String,
        default: generateId()
    }, 
    confirmed: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});
userSchema.methods.checkPassword = async function(pwd){
    return await bcrypt.compare(pwd, this.password)
}
const User = mongoose.model('User', userSchema);
export default User;