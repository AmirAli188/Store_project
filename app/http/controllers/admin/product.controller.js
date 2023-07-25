const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require('path');
const { productModel } = require("../../../models/product");
const createError = require('http-errors');
const { deleteFileInPublic , deleteFilesInPublic } = require("../../../utils/functions");
const { mongoIdSchema } = require("../../validators/api/mongoID.schema");
const mongoose = require('mongoose')

class productController extends Controller {
    async addProduct(req , res , next){
        try {
            console.log(req.files);
            const data = await createProductSchema.validateAsync(req.body)
             data.supplier = req.user._id
            if(req.files.length > 0){
                data.images = []
              req.files.forEach(item=>{
                const filePath = item.destination.substring(41)
                const image = path.join(filePath , item.filename).replace(/\\/g , "/")
                data.images.push(image)
              })
            }
            const {supplier , title , text , short_text , category , price , discount , count , images ,type} = data
            const result = await productModel.create({
                title , text , short_text , category , price , discount , count , images , tags , supplier,type
            })
            if(!result) throw createError.InternalServerError("اضافه کردن محصول با مشکل مواجه شد")
            res.status(201).json({
                message : "اضافه کردن محصول با موفقیت انجام شد"
            })
        } catch (error) {
            deleteFilesInPublic(req.files)
            next(error)
        }
    }
    async editProduct(req , res , next){
        try {
            let data = req.body
            const {id} = req.params
            const valuableKeys = ["title" , "text" , "short_text" , "tags" , "price" , "category" , "discount" , "count" , "images" , "type"]
            const badValues = ["" , " " , null , undefined , NaN]
            Object.entries(data).forEach((key , value)=>{
            if(!valuableKeys.includes(key[0])) delete data[key[0]]
            if(badValues.includes(key[1])) delete data[key[0]]
            })
            if(req.files.length > 0){
                data.images = []
                req.files.forEach(item =>{
                    const filePath = item.path.substring(41).replace(/\\/g , "/")
                    data.images.push(filePath)
                })
            }
            await createProductSchema.validateAsync(data)
            const result = await productModel.findByIdAndUpdate(id , {$set : data})
            if(!result) throw createError.InternalServerError("ویرایش محصول با مشکل مواجه شد ")
            res.status(201).json({
                message : "ویرایش محصول با موفقیت انجام شد"
            })
        } catch (error) {
            deleteFilesInPublic(req.files)
            next(error)  
        }
    }
    removeProduct(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getProductByID (req , res , next){
        try {
            const {id} = req.params
            const product = await this.findOneProduct(id)
            res.status(200).json({
                data : product
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllProducts(req , res , next){
        try {
            const search = req?.query?.search
            let products
            if(search){
                 products = await productModel.find({
                    $text : {
                        $search : search
                    }
                })  
            }else{
              products = await productModel.find({})  
            }  
            res.status(200).json({
                data : products
            })
           
        } catch (error) {
            next(error)
        }
    }
    async findOneProduct(productID){
            await mongoIdSchema.validateAsync({id : productID})
            const product = await productModel.aggregate([
                {$match : {_id : mongoose.Types.ObjectId(productID)}} , 
                {
                    $lookup:{
                        from : "users" , 
                        foreignField : "_id" , 
                        localField: "supplier" , 
                        as : "supplier"

                    }
                } , 
                {
                    $project:{
                        "supplier.OTP" : 0 , 
                        "supplier.discount" : 0 , 
                        "supplier.roles" : 0 , 
                        "supplier.bills" : 0 , 
                        "supplier.__v" : 0 , 
                    }
                },
                {
                    $lookup : {
                        from : "categories" , 
                        foreignField : "_id" , 
                        localField : "category" , 
                        as : "category"
                    }
                } , 
                {
                    $project : {
                        "category.__v" : 0
                    }
                }
            ]) 
            if(product.length == 0) return createError.BadRequest("محصول مورد نظر یافت نشد یا دیگر در دسترس نمیباشد")
            return product
    }
}
module.exports = {
    productController : new productController
}