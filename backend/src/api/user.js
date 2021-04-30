import express from 'express'
import {getPostsOf} from "../DAO/postDAO";
import {createUser, getUserBy, updateUser} from "../DAO/userDAO";
import {validateUsername} from "../DAO/authDAO";

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const user = express();

//for signup modal
user.post('/new', async (req, res) => {
    //TODO API-B2
    const user = req.body
    let newUser = null;
    const isValidUsername = await validateUsername(user.username)
    if (!isValidUsername) {
        newUser = await createUser(user)
    }
    res.send(newUser)
})

//for populating UserPage.js for a specified user(username).
//NOTE: in the returned "user" object, posts are just foreign references, i.e. not populated.
user.get('/:username', async (req, res) => {
    const {username} = req.params
    const user = await getUserBy(username)
    res.send(user)
})

//this API is for populating posts created by the specified user
user.get('/:username/posts/mine', async (req, res) => {
    const {countperpage, pageoffset} = req.headers
    const username = req.params.username
    const result = await getPostsOf(username, countperpage, pageoffset,'myPosts')
    res.send(result)
})

//this API is for populating posts created by the specified user
user.get('/:username/posts/watching', async (req, res) => {
    const {countperpage, pageoffset} = req.headers
    const username = req.params.username
    const result = await getPostsOf(username, countperpage, pageoffset, 'myWatchings')
    res.send(result)
})

user.put('/:username/edit', async (req,res)=>{
    console.log('responding to a put request')
    const user = req.body
    const updatedUser  = await updateUser(user)
    res.send(updatedUser)
})

export default user;

