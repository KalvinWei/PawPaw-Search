import User from "../db/schemas/UserSchema";
import Post from "../db/schemas/PostSchema";

async function getPostsFor(criteria, countPerPage,pageOffset){
    const onePagePosts =  await Post.getOnePage(criteria,countPerPage,pageOffset)
    const pageTotal = await Post.getPageTotal(criteria,countPerPage)
    return {posts:onePagePosts, pageTotal}
}

async function getPostsOf(username, countperpage, pageoffset, field) {
    const user =
        await User.findOne({username:username})
            .populate(field)
    const all = user[field]
    const pageTotal = Math.ceil(all.length / countperpage)
    const posts = all.slice(pageoffset * countperpage, pageoffset * countperpage + 1)
    return {posts, pageTotal}
}

async function getPostsSince(days, countPerPage, pageOffset){
    let now = new Date()
    const lastTime = new Date(now.setDate(now.getDate() - days))
    const criteria = {"createdAt":{$gt: lastTime.toISOString()}}
    return await getPostsFor(criteria,countPerPage,pageOffset)
}

async function getPostById(id){
    const post =
        await Post.findOne({_id:id})
    return post
}

export {getPostsOf, getPostsFor, getPostsSince}