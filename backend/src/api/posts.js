import express from 'express'
import {getPostsFor} from "../DAO/postDAO";

const posts = express()

posts.get('/',async (req,res) => {
    //TODO: API-B7
    const {searchCriteria, countPerPage, pageOffset} = req.body
    const posts = await getPostsFor(searchCriteria,countPerPage,pageOffset)
    res.send(posts)
})

export default posts;