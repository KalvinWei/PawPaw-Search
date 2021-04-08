import {User} from "../util/db/schema";

async function createUser(user) {

    const nUser = new User(user);
    await nUser.save();
    return nUser;
}

export {createUser}