import User from '../db/schemas/UserSchema';

function authenticateUser(username,password){
    return User.findOne({username:username,password:password})
}

function validateUsername(username){
    return User.findOne({username:username})
}

export default authenticateUser;
export {validateUsername}