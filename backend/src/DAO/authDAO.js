import User from '../db/schemas/UserSchema';

async function authenticateUser(username,password){
    // return await User.findOne({username:username})
    return User.findOne({username:username,password:password})
}

export default authenticateUser;