import express from 'express'

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const user = express.Router();

user.post('/new',(req,res)=>{
    //TODO API-B2
})

user.get('/:username',(req,res)=>{
    //TODO API-B3
})

user.get('/:username/posts/mine',(req,res)=>{
    const username = req.params.username;
    return getPostsCreatedBy(username);
})

export default user;

