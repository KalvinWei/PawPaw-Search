import express from 'express'

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const user = express.Router();

const userSchemaCopy = require('../db/schemas/UserSchema')

user.post('../../frontend/src/components/Dialogs/SignUpDialog/SignUpDialog',(request ,response)=>{
    //TODO API-B2
    const signedUpUser = new userSchemaCopy({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phone: request.body.phone,
        address: request.body.address
    })
    signedUpUser.save()
        .then(data => {
            response.json(data)
        })
        .catch(error =>{
            response.json(error)
        })
})

user.get('/:username',(req,res)=>{
    //TODO API-B3
})

user.get('/:username/posts/mine',(req,res)=>{
    const username = req.params.username;
    return getPostsCreatedBy(username);
})

export default user;

