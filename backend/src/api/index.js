import express from 'express';
import session from './session'
import posts from './posts'
import user from './user'
import dashboard from "./dashboard";

const api = express.Router();
api.use('/', session)
api.use('/posts',posts)
api.use('/user',user)
api.use('/dashboard',dashboard)

export default api;




