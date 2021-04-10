import express from 'express'

const posts = express.Router()

posts.get('/',(req,res) => {
    //TODO: API-B7
})

posts.get('/search',(req, res) => {
    //TODO: API-B8
} )

export default posts;