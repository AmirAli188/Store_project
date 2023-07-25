const { createBlogSchema } = require("../../validators/admin/blogSchema");
const Controller = require("../controller");
const path = require('path');
const { blogsModel } = require("../../../models/blogs");
const createError = require('http-errors')

class blogController extends Controller {
    async createBlog(req , res , next){
        try {
            await createBlogSchema.validateAsync(req.body)
            const author = req.user._id
            const filePath = req.file.destination.substring(41)
            let {title , text , short_text , tags , image , category} = req.body
            image = path.join(filePath , req.file.originalname).replace(/\\/g , "/")
            const result = await blogsModel.create({title , text , short_text , tags , image , category ,author})
            if(!result) throw createError.InternalServerError("در ساخت بلاگ مشکل ایجاد شد")
            res.status(401).json({
                message : "بلاگ با موفقیت ایجاد گشت"
            })
        } catch (error) {
            next(error)
        }
    } 
    async getOneBlogByID(req , res , next){
        try {
            const {id} = req.params
            const blog = await blogsModel.findById(id).populate([{path : "category" , select : ["title"]} , {path : "author" , select : ["id" , "mobile" , "first_name" , "last_name" , "username"]}])
            res.status(200).json({
                data : {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req , res , next){
        try {
          let blogs = await blogsModel.aggregate([
            {$match : {}},
            {
                $lookup:{
                    from : "users",
                    foreignField : "_id",
                    localField : "author" , 
                    as : "author"
                }
            },
            {
                $project:{
                    "author.OTP" : 0 , 
                    "author.discount" : 0 , 
                    "author.roles" : 0 , 
                    "author.bills" : 0 , 
                    "author.__v" : 0 , 
                }
            },
            {
                $lookup:{
                    from : "categories",
                    foreignField : "_id",
                    localField : "category" , 
                    as : "category"
                }
            },
            {
                $project:{
                    "category.__v" : 0 , 
                }
            },
          ])
          
          res.status(200).json({
          data: blogs
          })
        } catch (error) {
            next(error)
        }
    }
    async getCommentsOfBlog(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogByID(req , res , next){
        try {
            const {id} = req.params
            const deletedBlog = await blogsModel.findByIdAndDelete(id)
            if(!deletedBlog) throw createError.InternalServerError("در پاک کردن بلاگ مشکلی پیش آمد")
            res.status(201).json({
                message : "پاک کردن بلاگ با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogByID(req , res , next){
        try {
            const {id} = req.params
            const data = req.body
            const badValues = ["" , " " , 0 , undefined , null , false , -1 ]
            const correctList = ["title" , "text" , "short_text" , "tags" , "image" , "category"]
            Object.keys(data).forEach(key => {
                if(badValues.includes(key)) delete data[key]
                if(!correctList.includes(key)) delete data[key]
            })
            const filePath = req?.file?.destination?.substring(41)
            if(req.file){
                data.image = (path.join(filePath , req.file.originalname)).replace(/\\/g , "/")
            }
            await createBlogSchema.validateAsync(data)
            const updateBlog = await blogsModel.findByIdAndUpdate(id , {$set : data})
            res.status(201).json({
                message : "به روز رسانی بلاگ با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
     
}
module.exports = {
    blogController : new blogController
}