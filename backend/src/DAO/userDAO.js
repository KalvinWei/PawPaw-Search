import User from "../db/schemas/UserSchema";

//retrieve a user without population of its posts
async function getUserBy(username) {
    const user = await User.findOne({username: username})
    return user
}

//add a user to User schema
async function createUser(user) {
    const nUser = new User(user)
    return (await nUser.save())
}

async function updateUser(user) {
    const result = await User.updateOne({username: user.username}, {...user})
    if (result.nModified === 0 || result.nMatched === 0) {
        return null
    } else {
        const newUser = await getUserBy(user.username)
        return newUser
    }
}

async function checkIfWatching(userId, postId){
    const result = await User.findOne({_id:userId, myWatchings:[postId]})
    return !!result
}

async function updateWatching(userId, postId, actionType) {
    console.log(userId, postId, actionType)
    let result
    if(actionType === "watching"){
        result = await User.updateOne({ _id: userId},{ $push: { myWatchings: postId} })
    } else {
        result = await User.updateOne({ _id: userId},{ $pull: { myWatchings: postId} })
    }
    console.log(result)
    return result.nModified === 1 ? 1 : 0
}

export {createUser, getUserBy, updateUser, checkIfWatching, updateWatching}