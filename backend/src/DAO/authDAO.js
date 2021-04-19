import User from '../db/schemas/UserSchema';

async function authenticateUser(username,password){
    return await User.findOne({username:username,password:password})

}

async function validateUsername(username){
    return await User.findOne({username:username})
}

export default authenticateUser;
export {validateUsername}