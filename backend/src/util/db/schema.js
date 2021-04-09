/** Schemas such as Post, Pet, User are defined here.
 */
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//TODO - User
const UserSchema = new Schema(
    {
        name: String,
        username:String,
        password:String
    },
    {timestamps: {}})


const User = mongoose.model('loginUser', UserSchema);


//TODO - Post






//TODO - export all
export {User};