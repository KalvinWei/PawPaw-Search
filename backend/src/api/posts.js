import express from 'express'
import {getPostsFor, getPostsSince} from "../DAO/postDAO";

const posts = express()

posts.get('/',async (req,res) => {
    //TODO: API-B7
    const {searchCriteria, countPerPage, pageOffset} = req.headers
    const posts = await getPostsFor(searchCriteria,countPerPage,pageOffset)
    res.send(posts)
})

posts.get('/newest/:days', async (req,res)=>{
    const days = req.params.days
    const newestPosts = await getPostsSince(parseInt(days))
    res.send(newestPosts)
})

export default posts;