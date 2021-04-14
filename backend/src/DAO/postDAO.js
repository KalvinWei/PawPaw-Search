import User from "../db/schemas/UserSchema";
import Post from "../db/schemas/PostSchema";

async function getPostsFor(criteria, countPerPage,pageOffset){
    const onePagePosts =  await Post.getOnePage(criteria,countPerPage,pageOffset)
    return onePagePosts
}

async function getPostsCreatedBy(username) {
    const user =
        await User.findOne({username:username})
            .populate('myPosts')
    return user.myPosts
}

async function getPostsWatchedBy(username) {
    const user =
        await User.findOne({username:username})
            .populate('myWatchings')
    return user.myWatchings
}

async function getPostsSince(days){

    let now = new Date()
    const lastTime = new Date(now.setDate(now.getDate() - days))

    const posts =
        await Post.find({"createdAt":{$gt: lastTime.toISOString()}})
    return posts
}

export {getPostsCreatedBy, getPostsWatchedBy,getPostsFor, getPostsSince}