import express from 'express'
import {getPostsFor, getPostsSince, getMatchedPostsFor, getPostById, savePost, addTrace} from "../DAO/postDAO";
import fs from "fs";
import {v4 as uuidv4} from 'uuid'

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

//create new post, handle image copy from '/temp' to 'petImages'
posts.post('/', async (req,res) => {
    const PATH_ROOT = '../frontend/public/assets'
    const post = req.body
    const petImgNames = []
    if(post.petImages.length){
        for(const i in post.petImages){
            const ORIGINAL_PATH = `${PATH_ROOT}/temp/${post.petImages[i]}`
            const dir = fs.opendirSync(ORIGINAL_PATH)
            let file
            while((file=dir.readSync())!==null){
                if(file.isFile()){
                    const newFileName = uuidv4()+file.name.substring(file.name.indexOf('.'))
                    fs.copyFileSync(`${ORIGINAL_PATH}/${file.name}`,`${PATH_ROOT}/petImages/${newFileName}`)
                    petImgNames.push(newFileName)
                }
            }
            dir.closeSync()
        }
        post.petImages = petImgNames
    } else {
        post.petImages = [`${PATH_ROOT}/petImages/default.png`]
    }

    const result = await savePost(post)
    res.send(result)
})

posts.patch('/:postId/trace', async (req,res) =>{
    const {postId} = req.params
    const spot = req.body
    const result = await addTrace(spot,postId)
    res.send(result)
})

export default posts;