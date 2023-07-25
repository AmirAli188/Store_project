const Joi = require('@hapi/joi')
const getOTPSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نیست")) 
    
})
const checkOTPSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نیست")) ,
    code :  Joi.string().min(4).max(6).error(new Error("کد وارد شده صحیح نیست"))
})
module.exports = {
    getOTPSchema ,
    checkOTPSchema
}