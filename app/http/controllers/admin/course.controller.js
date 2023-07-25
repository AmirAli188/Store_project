const { courseModel } = require("../../../models/course");
const { setImageInRequests, deleteFileInPublic } = require("../../../utils/functions");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const createError = require('http-errors');
const { mongoIdSchema } = require("../../validators/api/mongoID.schema");
const mongoose = require('mongoose')
 
  
class courseController extends Controller{
    async getListOfCourses(req , res , next){
        try {
          const search = req?.query?.search
          let courses
          if(search){
            courses = await courseModel.find({
                $text : {
                    $search : search
                }
            }).populate([
                {path : "category" , select : {title : 1}},
                {path : "teacher" , select : {first_name : 1 , last_name : 1 , email : 1 , mobile : 1}}
            ])
          }else{
            courses = await courseModel.find({}).
            populate([
                {path : "category" , select : {title : 1}},
                {path : "teacher" , select : {first_name : 1 , last_name : 1 , email : 1 , mobile : 1}}
            ])
          }
          return res.status(200).json({
            courses
          })
        } catch (error) {
            next(error)
        }
    }
    async addCourses(req , res , next){
        try {
            const data = req.body
            await createCourseSchema.validateAsync(data)
            data.image = setImageInRequests(req.file)
            data.teacher = req.user._id
            const {title , text , short_text , image , teacher , category , price , discount , type } = data
            if(Number(price) > 0 && type === "free") throw createError.BadRequest("در صورت رایگان بودن دوره نمیتوان قیمتی برای دوره ثبت کرد")

            const course = await courseModel.create({
                title , text , short_text , image , teacher , category , price , discount , type
            })
            if(!course._id) createError.InternalServerError("دوره ساخته نشد")
            res.status(201).json({
                message : "ساخت دوره با موفقیت انجام شد"
            })
        } catch (error) {
            deleteFileInPublic(req.file)
            next(error)
        }
    }
    async getOneCourse(req , res , next){
        try {
            const {id} = req.params
            await mongoIdSchema.validateAsync({id})
            const course = await courseModel.findOne({_id : id})
            .populate([
                {path : "category" , select : {title : 1}} , 
                {path : "teacher" , select : { mobile : 1 , first_name : 1 , last_name : 1} }
            ])
            
            if(!course) throw createError.BadRequest("دوره خواسته شده یافت نشد")
            res.status(200).json({
                course
            })
        } catch (error) {
            next(error)
        }
    }
    async findCourseById(id){
        mongoIdSchema.validateAsync({id})
        const course = await courseModel.findById(id)
        if(!course) throw createError.BadRequest("دوره مورد نظر یافت نشد")
        return course
    }
}
module.exports = {
    courseController : new courseController
}