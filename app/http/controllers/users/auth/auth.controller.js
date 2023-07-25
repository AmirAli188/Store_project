const { getOTPSchema ,checkOTPSchema } = require("../../../validators/user/auth.Schema")
const createErorr = require('http-errors')
const { RandomNumberGenerator, SignAccessToken, SignRefreshToken, veifyRefreshToken } = require("../../../../utils/functions")
const { UserModel } = require("../../../../models/users")
const Controller = require("../../controller")
class authController extends Controller {
   async getOTp(req , res , next){
        try {
            await getOTPSchema.validateAsync(req.body)
            const {mobile} = req.body
            const code = RandomNumberGenerator()
            const result =await this.saveUser(mobile , code)
            if(!result) throw createErorr.Unauthorized("ورود شما انجام نشد")
            res.status(200).send({
                data :{
                    statusCode : 200 , 
                    message : "کد ورود با موفقیت برای شما ارسال شد" ,
                    code , 
                    mobile
                }
            })
        } catch (error) {
            next(createErorr.BadRequest(error.message))
        }
    }
   async checkOTP (req , res , next){
    try {
        await checkOTPSchema.validateAsync(req.body)
        const {code , mobile} = req.body
        const user = await UserModel.findOne({mobile})
        if(!user) throw createErorr.Unauthorized("کاربری یافت نشد")
        if(user.OTP.code != code) throw createErorr.Unauthorized("کد وارد شده صحیح نمیباشد")
        const now = Date.now()
        if(+user.OTP.expiresIn < now) throw createErorr.Unauthorized("کد وارد شده منقضی شده است")
        const token = await SignAccessToken(user._id)
        const RefreshToken = await SignRefreshToken(user._id)
        res.json({
            accessToken : token,
            RefreshToken : RefreshToken
        })
    } catch (error) {
        next(createErorr.BadRequest(error.message))
    }
    }
   async refreshToken(req , res , next){
   try {
     const {refreshToken} = req.body
     const mobile = await veifyRefreshToken(refreshToken)
     const user = await UserModel.findOne({mobile})
     const accessToken  = await SignAccessToken(user._id)
     const newRefreshToken = await SignRefreshToken(user._id)
     return res.json({
         data : {
           accessToken,
           newRefreshToken   
         }
     }) 
   } catch (error) {
    next(error)
   }
    }
   async saveUser(mobile , code){
        const OTP = {
            code,
            expiresIn : new Date().getTime() + 120000
        }
        const result =await UserModel.findOne({mobile})
        if(result){
            return (await this.UpdateUser(mobile , {OTP}))
        }
        return !!(await UserModel.create({mobile , OTP}))
    }
   async UpdateUser (mobile , ObjectData = {}){
        Object.keys(ObjectData).forEach(key =>{
            if(["" , " " , undefined , NaN , null , 0 , "0"].includes(ObjectData[key])) delete ObjectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile} , {$set : ObjectData})
        return !!updateResult.modifiedCount
    }
}
module.exports={
    authController : new authController
}