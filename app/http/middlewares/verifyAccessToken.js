const JWT = require("jsonwebtoken")
const createError = require("http-errors")
const { UserModel } = require("../../models/users")
const secret = "ikrgjirfeofie90gj0948tu59hgrn"



function verifyAccessToken(req , res , next){
    const headers = req.headers
    const token = headers?.authorization?.split(" ")[1]
    if(token){
        JWT.verify(token , secret , async(err , payload)=>{
            if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
            const {mobile} = payload
            const user = await UserModel.findOne({mobile})
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"))
            req.user = user
            return next();
        })
    }
    else return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
}
function checkRole (role){
    return function(req , res , next){
        try {
            const user = req.user
            if(user.roles.includes(role)) return next()
            throw createError.Forbidden("شما به این قسمت دسترسی ندارید")
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    verifyAccessToken , 
    checkRole
}
