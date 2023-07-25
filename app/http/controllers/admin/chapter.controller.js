const { courseModel } = require("../../../models/course");
const Controller = require("../controller");
const createError = require('http-errors');
const { mongoIdSchema } = require("../../validators/api/mongoID.schema");


class chapterController extends Controller {
    async addChapter(req , res , next){
        try {
            const {id , title , text} = req.body
            await this.findCourseById(id)
            const addChapterResult = await courseModel.updateOne({_id : id} , { $push :{
                chapters : {title , text , episodes : []}}
            })
            if(addChapterResult.modifiedCount == 0) throw createError.InternalServerError("فصل افزوده نشد")
            return res.status(201).json({
                message : "فصل با موفقیت افزوده شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getChapters(req , res , next){
        try {
            const {id} = req.params
            const course =await this.findCourseById(id)
            const chapters = course.chapters
            res.status(200).json({
                chapters
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteChaptersOfCourse(req , res , next){
        try {
            const {id} = req.params
            const chapter = await courseModel.findOne({"chapters._id" : id} , {"chapters.$" : 1})
            if(!chapter) throw createError.BadRequest(" فصل مورد نظر یافت نشد")
            const result = await courseModel.updateOne({"chapters._id" : id} , {
                $pull : {
                    chapters: {
                        _id : id
                    }
                }
            })
            if(!result) throw createError.InternalServerError(" فصل مورد نظر پاک نشد")
            res.status(201).json({
                message : "فصل مورد نظر با موفقیت پاک شد"
            })
        } catch (error) {
            next(error)
        } 
    }
    async updateOneChapter (req , res , next){
        try {
            const {id} = req.params
            const chapter = await courseModel.findOne({"chapters._id" : id} , {"chapters.$" : 1})
            if(!chapter) throw createError.BadRequest("فصل مورد نظر یافت نشد")
            const {title , text} = req.body
            const updateResult = await courseModel.updateOne({"chapters._id" : id} , {
                $set :{ "chapters.$" : {title , text}}
            })
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("خطای سمت سرور / تغییرات اعمال نشد")
            res.status(201).json({
                message : "تغییرات اعمال شد "
            })
        } catch (error) {
            next(error)
        }
    }
    async findCourseById(id){
        mongoIdSchema.validateAsync({id})
        const course = await courseModel.findOne({_id : id})
        if(!course) throw createError.BadRequest("دوره مورد نظر یافت نشد")
        return course
    }
}
module.exports = {
    chapterController : new chapterController
} 