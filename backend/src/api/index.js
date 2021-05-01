import express from 'express';
import session from './session'
import posts from './posts'
import user from './user'
import dashboard from "./dashboard"
import images from './images'

const api = express.Router();
api.use('/', session)
api.use('/posts',posts)
api.use('/users',user)
api.use('/dashboard',dashboard)
api.use('/images', images)

export default api;




