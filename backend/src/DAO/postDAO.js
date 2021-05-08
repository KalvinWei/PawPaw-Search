import User from "../db/schemas/UserSchema";
import Post from "../db/schemas/PostSchema";
// import {sphericalCosines} from "earth-distance-js"
import PetType from "../db/schemas/PetTypeSchema";

async function getPostsFor(criteria, countPerPage,pageOffset){
    //TODO: process criteria(searchSetting) to proper query object for mongoDB
    // if(criteria.petBreed === "All") delete criteria.petBreed
    // else {
    //
    // }
    criteria = {}
    delete criteria.status
    // status: "All",
    //     petBreed: "All",
    //     petSize: "All",
    //     petGender: "All",
    //     petColor: "All",
    //     //use Geolocation API to fetch current user's location,
    //     // and search in an area of the given radius
    //     originLatLng: [],
    //     rangeRadius: 0,
    //     //use keyword to search in petName, collarTagDescription, comment
    //     keywords: ""

    const onePagePosts =  await getOnePage(criteria,countPerPage,pageOffset)
    const pageTotal = await getPageTotal(criteria,countPerPage)
    return {posts:onePagePosts, pageTotal}
}

async function getPostsOf(username, countperpage, pageoffset, field) {
    countperpage = parseInt(countperpage)
    pageoffset = parseInt(pageoffset)
    const user =
        await User.findOne({username:username})
            .populate(field)
            .populate('petType')
    const all = user[field]
    const pageTotal = Math.ceil(all.length / countperpage)
    const posts = all.slice(pageoffset * countperpage, pageoffset * countperpage + countperpage)
    return {posts, pageTotal}
}

async function getPostsSince(days, countPerPage, pageOffset){
    countPerPage = parseInt(countPerPage)
    pageOffset = parseInt(pageOffset)
    let now = new Date()
    const lastTime = new Date(now.setDate(now.getDate() - days))
    const criteria = {"createdAt":{$gt: lastTime.toISOString()}}
    return await getPostsFor(criteria,countPerPage,pageOffset)
}

async function getMatchedPostsFor(postId, countPerPage, pageOffset){
    countPerPage = parseInt(countPerPage)
    pageOffset = parseInt(pageOffset)
    const post =
        await Post.findOne({_id:postId})
            .populate('matches')
    if(!post) return null

    const allWatches = post.matches
    if(!allWatches.length) return null
    const pageTotal = Math.ceil(allWatches.length / countPerPage)
    const posts = allWatches.slice(pageOffset * countPerPage, pageOffset * countPerPage + countPerPage)
    return {posts, pageTotal}
}

async function getPostById(id){
    const post =
        await Post.findOne({_id:id})
            .populate('petType')
    return post
}

//some static methods
async function getOnePage(searchCriteria, countPerPage, pageOffset){
    countPerPage = parseInt(countPerPage)
    pageOffset = parseInt(pageOffset)
    const posts = await Post.find(searchCriteria).skip(countPerPage * pageOffset).limit(countPerPage).populate('petType')
    return posts
}

async function getPageTotal(searchCriteria, countPerPage){
    countPerPage = parseInt(countPerPage)
    return Math.ceil((await Post.countDocuments(searchCriteria)) / countPerPage)
}

async function savePost(post){
    const petType = await PetType.findOne({breed:post.petBreed})
    post.petType = petType._id
    delete post.breed

    const nPost = new Post(post)
    const savedPost = await nPost.save()

    const user = await User.findOne({_id:post.poster})
    user.myPosts.push(savedPost._id)
    await user.save()

    return savedPost
}

async function addTrace(spot,postId){
    const post = await Post.findOne({_id: postId})
    post.trace.push(spot)
    await post.save()
    const savedPost = await Post.findOne({_id:postId}).populate('petType').populate('matches')
    return savedPost
}

export {getPostsOf, getPostsFor, getPostsSince, getMatchedPostsFor, getPostById, savePost, addTrace}