import express from 'express'
import {getPostsCreatedBy, getPostsWatchedBy} from "../DAO/postDAO";
import {createUser, getUserBy} from "../DAO/userDAO";
import {validateUsername} from "../DAO/authDAO";

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const user = express();

//for signup modal
user.post('/new', async (req, res) => {
    //TODO API-B2
    const {username, password, email, firstName, lastName, phone, addrNo, street, city, postcode} = req.body
    const newUser = {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: {
            number: addrNo,
            street: street,
            city: city,
            postcode: postcode
        }
    }

    const result = {isSuccessful: false, user: null}
    if (!validateUsername(username)) {
        const user = await createUser(newUser)
        if (user) {
            result.isSuccessful = true
            result.user = user
        }
    }

    res.send(result)
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
    const username = req.params.username
    res.send(await getPostsCreatedBy(username))
})

//this API is for populating posts created by the specified user
user.get('/:username/posts/watching', async (req, res) => {
    const username = req.params.username
    res.send(await  getPostsWatchedBy(username))
})

export default user;

