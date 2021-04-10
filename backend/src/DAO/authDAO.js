import { User } from '../db/schemas/PostSchema';

async function authenticateUser(username,password){
    // return await User.findOne({username:username})
    return await User.findOne({username:username,password:password})
}

export default authenticateUser;