import User from "../db/schemas/UserSchema";
import Post from "../db/schemas/PostSchema";

async function getPostsFor(criteria, countPerPage,pageOffset){
    return await Post.getOnePage(criteria,countPerPage,pageOffset)
}

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

export {getPostsCreatedBy, getPostsWatchedBy,getPostsFor}