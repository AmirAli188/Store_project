const createError = require("http-errors");
const { categoryModel } = require("../../../models/categories");
const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");


class categoryController extends Controller {
    async addCategory(req , res , next){
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title , parent} = req.body
            const category = await categoryModel.create({title , parent})
            if(!category) throw createError.internalServerError("خطای سمت سرور")
            return res.status(201).json({
                data : {
                    code : 201 , 
                    message : "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req , res , next){
        try {
            const {id} = req.params
            const findAndDeleteCategory = await categoryModel.deleteMany({
                $or:[
                    {_id : id} , 
                    {parent : id}
                ]
            })
            if(!findAndDeleteCategory) throw createError.internalServerError("خطای سمت سرور")
            res.status(200).json({
                message : "حذف دسته بندی با موفقیت انجام شد"
        })
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req , res , next){
        try {
           await updateCategorySchema.validateAsync(req.body)
           const {id} = req.params
           const {title} = req.body
           const updateResult = await categoryModel.findByIdAndUpdate(id , {
            $set : {title}
           })
           if(!updateResult) throw createError.internalServerError(" ویرایش دسته بندی با شکست مواجه شد")
           res.status(201).json({
            message : "به روز رسانی دسته بندی با موفقیت انجام شد"
           })

        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req , res , next){
        try {
            const categories = await categoryModel.find({parent : undefined} , {__v : 0})
    
            res.status(200).json({
                data : categories
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req , res , next){
        try {
            const {id} = req.params
            const result = await categoryModel.findById(id,{
               __v : 0 , 
            })
            if(!result) throw createError.badRequest("دسته بندی مورد نظر پیدا نشد")
            res.status(200).json({
                data : result
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req , res , next){
        try {
            const categories = await categoryModel.find({parent : undefined} , {__v : 0})
            if(!categories) throw createError.internalServerError("در دریافت دسته بندی ها مشکلی پیش آمد")
            res.status(200).json({
                data : categories
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParents(req , res , next){
        try {
            const {id} = req.params
            const category = await categoryModel.find({parent : id},{__v : 0 , parent: 0})
            if(!category) throw createError.internalServerError("زیر دسته بندی یافت نشد")
            res.status(200).json({
                data : category
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    categoryController : new categoryController
}