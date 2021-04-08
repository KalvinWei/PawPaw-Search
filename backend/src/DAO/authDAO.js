import { User } from '../util/db/schema';

async function authenticateUser(username,password){
    // return await User.findOne({username:username})
    return await User.findOne({username:username,password:password})
}

export default authenticateUser;