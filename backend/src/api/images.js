import express from "express";
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

const TEMP_FOLDER = 'assets/images/temp'
const tempFolder = multer({dest:TEMP_FOLDER})

const images = express()
images.use(cors())

images.post('/', tempFolder.single('petImage'),(req,res)=>{

    res.contentType('text/plaintext').send(req.file.filename)

})

images.delete('/', (req,res)=>{
    const {id} = req.params
    if(fs.existsSync(`TEMP_FOLDER/${id}`)) fs.unlinkSync(`TEMP_FOLDER/${id}`)
    res.send()
})

export default images