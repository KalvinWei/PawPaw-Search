/** Schemas such as Post, Pet, User are defined here.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: String,
        username:String,
        password:String
    },
    {timestamps: {}})


const User = mongoose.model('loginUser', UserSchema);




export {User};