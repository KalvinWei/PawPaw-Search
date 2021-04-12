import express from 'express'
import {getPostsCreatedBy, getPostsWatchedBy} from "../DAO/postDAO";
import {createUser, getUserBy} from "../DAO/userDAO";

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const user = express.Router();

//for signup modal
user.post('/new',async (req ,res)=>{
    //TODO API-B2
    const saveResult = await createUser(req.body.user)
    res.send(saveResult)
})

//for populating UserPage.js for a specified user(username).
//NOTE: in the returned "user" object, posts are just foreign references, i.e. not populated.
user.get('/:username',async (req,res)=>{
    //TODO API-B3
    const username  = req.params.username
    const user = await getUserBy(username)
    return user
})

//this API is for populating posts created by the specified user
user.get('/:username/posts/mine',async (req,res)=>{
    const username = req.params.username;
    return getPostsCreatedBy(username);
})

//this API is for populating posts created by the specified user
user.get('/:username/posts/watching',async (req,res)=>{
    const username = req.params.username;
    return getPostsWatchedBy(username);
})

export default user;

