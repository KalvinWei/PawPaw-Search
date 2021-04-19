import express from 'express'
import {getPostsFor, getPostsSince} from "../DAO/postDAO";

const posts = express()

posts.get('/',async (req,res) => {
    //TODO: API-B7
    const {searchcriteria, countperpage, pageoffset} = req.headers
    const result = await getPostsFor(JSON.parse(searchcriteria),parseInt(countperpage),parseInt(pageoffset))
    res.send(result)
})

posts.get('/newest/', async (req,res)=>{
    const {days, countperpage, pageoffset} = req.headers
    const newestPosts = await getPostsSince(parseInt(days),parseInt(countperpage), parseInt(pageoffset))
    res.send(newestPosts)
})

posts.get('/posts/:id', async (req, res)  => {
    const {id} = req.params
    const post = await getPostById(id)
    res.send(post)
})

export default posts;