import express from 'express'
import authenticateUser from "../DAO/authDAO";
// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const session = express.Router();

session.post('/', async (req,res)=>{
    //TODO API-B1
    const username = req.body.username;
    const password = req.body.password;
    const user = await authenticateUser(username,password)
    const isValidUser = user ? true:false
    res.json({isValidUser:isValidUser, user:user})

})

session.get('/',(req,res)=>{
    res.send("success")
})

export default session;
