const { UserModel } = require("../models/users")
const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const redisClient  = require("./init-redis")
const fs = require('fs')
const path = require('path')


function RandomNumberGenerator(){
    return Math.floor((Math.random() * 90000) + 10000)
}
function SignAccessToken (userID){
    return new Promise(async(resolve,reject)=>{
        const user = await UserModel.findById(userID)
        const payload = {
            mobile : user.mobile 
        }
        const secret = "ikrgjirfeofie90gj0948tu59hgrn"
        const option = {
            expiresIn : "1h"
        }
         JWT.sign(payload , secret , option , (err , token)=>{
            if(err) reject(createError.InternalServerError("خطای سمت سرور"))
            resolve(token)
        })
    })
}
function SignRefreshToken (userID){
    return new Promise(async(resolve,reject)=>{
        const user = await UserModel.findById(userID)
        const payload = {
            mobile : user.mobile 
        }
        const secret = "0ikvi00eife9fi9fi9gie9ige9gie9"
        const option = {
            expiresIn : "1y"
        }
        JWT.sign(payload , secret , option ,( async(err , token)=>{
            if(err) reject(createError.InternalServerError("خطای سمت سرور"))
            //await redisClient.SETEX(userID + "",(365*24*60*60), token)
            resolve(token)
        }))
    })
}  
function veifyRefreshToken(token){
    return new Promise((resolve , reject)=>{
        const refreshTokenSECRET = "0ikvi00eife9fi9fi9gie9ige9gie9"
        JWT.verify(token , refreshTokenSECRET , async(err , payload)=>{
            if(err) return reject(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile})
            if(!user) return reject(createError.Unauthorized("وارد حساب کاربری خود شوید"))
           // const refreshToken = await redisClient.get(user._id + "")
            if(token)return resolve(mobile)
            return reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"))
        })
    })
}
function deleteFileInPublic(image){
    if(image){
      const filePath = image?.path
       fs.unlinkSync(filePath)
    }
}
function deleteFilesInPublic(images){
   images.forEach(item =>{
    const destination = item.destination
    const filePath = path.join(destination , item.filename)
    fs.unlinkSync(filePath)
   })
   
}
function setImageInRequests(image){
    const picture = image.path.substring(41).replace(/\\/g , "/")
    return picture
}
function setVideoInRequest(video){
    const film = video.path.replace(/\\/g , "/" )
    return film
}
function returnTimeOfVideo(second){
    const total = Math.round(second)/60
    let [minutes , percent] = String(total).split(".")
    let seconds = Math.round((percent/100) * 60).toString().substring(0 , 2)
    let hours = 0
    if(minutes >= 60){
        let total = minutes / 60
        let [h1 , m1] = String(total).split(".")
        hours = h1
        minutes = Math.round((m1 / 100) * 60)
    }
    if(String(hours).length == 1) hours = `0${hours}`
    if(String(minutes).length == 1) minutes = `0${minutes}`
    if(String(seconds).length == 1) seconds = `0${seconds}`

    return(hours + ":" + minutes + ":" + seconds)
}


module.exports={
    RandomNumberGenerator , 
    SignAccessToken,
    SignRefreshToken,
    veifyRefreshToken,
    deleteFileInPublic,
    deleteFilesInPublic,
    setImageInRequests , 
    setVideoInRequest , 
    returnTimeOfVideo
}


