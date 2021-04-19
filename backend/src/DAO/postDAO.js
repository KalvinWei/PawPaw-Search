import User from "../db/schemas/UserSchema";
import Post from "../db/schemas/PostSchema";
import {sphericalCosines} from "earth-distance-js"

async function getPostsFor(criteria, countPerPage,pageOffset){
    //TODO: process criteria(searchSetting) to proper query object for mongoDB
    // if(criteria.petBreed === "All") delete criteria.petBreed
    // else {
    //
    // }
    criteria = {}

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

    const onePagePosts =  await Post.getOnePage(criteria,countPerPage,pageOffset)
    const pageTotal = await Post.getPageTotal(criteria,countPerPage)
    return {posts:onePagePosts, pageTotal}
}

async function getPostsOf(username, countperpage, pageoffset, field) {
    const user =
        await User.findOne({username:username})
            .populate(field)
            .populate('petType')
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
            .populate('petType')
    return post
}

export {getPostsOf, getPostsFor, getPostsSince}