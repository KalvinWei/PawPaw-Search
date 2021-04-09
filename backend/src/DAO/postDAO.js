import {Post, User} from "../db/schemas/PostSchema";

async function getPostsCreatedBy(username) {
    const user =
        await User.findOne({username:username})
            .populate('myPosts')
    return user.myPosts;
}

async function getPostsWatchedBy(username) {
    const user =
        await User.findOne({username:username})
            .populate('watchings')
    return user.watchings;
}

export {getPostsCreatedBy, getPostsWatchedBy}