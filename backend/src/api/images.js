import express from "express";
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import {v4 as uuidv4} from "uuid";

const TEMP_FOLDER = '../frontend/public/assets/temp/'
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const path = TEMP_FOLDER + uuidv4()
        try {
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true })
            }
        } catch (err) {
            console.error(err)
        }
        cb(null,path)
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})

const images = express()
images.use(cors())

images.post('/', upload.single('petImage'),(req,res)=>{
    const serverId = req.file.destination.substring(req.file.destination.lastIndexOf('/')+1)
    res.contentType('text/plaintext').send(serverId)
})

export default images