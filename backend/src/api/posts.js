import express from 'express'
import {getPostsFor, getPostsSince, getMatchedPostsFor, getPostById, savePost} from "../DAO/postDAO";

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

posts.get('/:id', async (req, res)  => {
    const {id} = req.params
    const post = await getPostById(id)
    res.send(post)
})

posts.get('/:id/matches', async (req,res) =>{
    const {postid, countperpage,  pageoffset} = req.headers
    const result = await getMatchedPostsFor(postid, countperpage, pageoffset)
    res.send(result)
})

posts.post('/', async (req,res) => {
    const post = req.body
    const result = await savePost(post)
    console.log("backend result")
    console.log(result)
    res.send(result)
})

export default posts;