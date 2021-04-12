import User from "../db/schemas/UserSchema";

//retrieve a user without population of its posts
async function getUserBy(username) {
    const user = await User.findOne({username:username})
    return user
}

//add a user to User schema
async function createUser(user) {
    const nUser = new User(user)
    return (await nUser.save())
}

export {createUser, getUserBy}