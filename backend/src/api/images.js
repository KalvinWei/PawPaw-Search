import express from "express";
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

const TEMP_FOLDER = 'assets/images/temp'
const upload = multer({dest:TEMP_FOLDER})

const images = express()
images.use(cors())

images.post('/', upload.single('petImage'),(req,res)=>{
    req.file.path =
    res.contentType('text/plaintext').send(req.file.filename)
})

images.delete('/', (req,res)=>{
    const {id} = req.params
    if(fs.existsSync(`TEMP_FOLDER/${id}`)) fs.unlinkSync(`TEMP_FOLDER/${id}`)
    res.send()
})

export default images