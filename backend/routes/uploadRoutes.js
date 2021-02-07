import path from 'path'
import express from 'express'

import multer from 'multer'
import { createVerify } from 'crypto'

const router = express.Router() 


///path is added to add make sure it has the corrext extension (e.g jpg or png)
///multer is a middleware used to create 
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/uploads')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
///checking that its either jpg jpeg or png
///mimetype checks for the corret type (hast o be image)
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname=filetypes.test(path.extname(originalname).toLocaleLowerCase())
    const mimetype =filetypes.test(file.mimetype)
    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images Only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router