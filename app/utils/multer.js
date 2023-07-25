const multer = require('multer')
const fs = require("fs")
const path = require("path")
const createError = require('http-errors')




function createPath(){
    const date = new Date()
    const year = date.getFullYear() + ""
    const month = date.getMonth() + ""
    const day = date.getDate() + ""
    const directory = path.join(__dirname , ".." , ".." , "public" , "upload" , year , month , day)
    fs.mkdirSync(directory , {recursive : true})
    return directory
}

const imageStorage = multer.diskStorage({
    destination(req , file,cb){
        const filePath = createPath() 
        cb(null , filePath )
    },
    filename(req , file , cb){
        const ext = path.extname(file.originalname)
        if(![".jpg" , ".gif" , ".webp" , ".png" , ".jpeg", ".jfif"].includes(ext)){
            return cb(createError.BadRequest("فرمت فایل ارسال شده صحیح نیست"))
        }
        const fileName = String (new Date().getTime() + ext)
        cb(null , fileName)
    }
})
const videoStorage = multer.diskStorage({
    destination(req , file , cb){
        const filePath = createPath()
        cb(null , filePath)
    },
    filename(req , file , cb){
        const ext = path.extname(file.originalname)
        if(![".mp4" , ".mov" , ".mpg" , ".mkv"].includes(ext)){
            return cb(createError.BadRequest("فرمت فایل ارسال شده صحیح نیست"))
        }
        const fileName = String (new Date().getTime() + ext)
        cb(null , fileName)
    }
}) 
const imageUploadFile = multer({storage : imageStorage , limits: {fileSize: 1*1000*1000}})
const videoUploadFile = multer({storage : videoStorage , limits : {fileSize : 300*1000*1000}})

module.exports = {
    imageUploadFile , videoUploadFile
}