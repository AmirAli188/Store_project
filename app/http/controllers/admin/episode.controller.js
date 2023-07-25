const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { courseModel } = require("../../../models/course");
const { setImageInRequests , setVideoInRequest, returnTimeOfVideo } = require("../../../utils/functions");
const { addEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const createError = require('http-errors');
const { mongoIdSchema } = require("../../validators/api/mongoID.schema");


class episodeController extends Controller {
    async addNewRequest(req , res , next){
        try {
          await addEpisodeSchema.validateAsync(req.body)
            const {title , text , type , chapterID } = req.body
            const video = setImageInRequests(req.file)
            const seconds = await getVideoDurationInSeconds(setVideoInRequest(req.file))
            const time = returnTimeOfVideo(seconds)
            const episode = {title , text , type , time, video}
            const addEpisodeResult = await courseModel.updateOne({"chapters._id" : chapterID} , {
                $push : {
                    "chapters.$.episodes" : episode
                }
            })
            if(addEpisodeResult.modifiedCount == 0) throw createError.InternalServerError("اپیزود مورد نظر اضافه نشد")
            res.status(201).json({
                message: "افزودن اپیزود با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        } 
    }
    async removeEpisode(req , res , next){
        try {
            const {id: EpisodeID} = await mongoIdSchema.validateAsync({id : req.params.EpisodeID})
            const removeEpisodeResult = await courseModel.updateOne({"chapters.episodes._id" : EpisodeID} , {
                $pull : {
                    "chapters.$.episodes" : {
                        _id : EpisodeID
                    }
                }
            })
            if(removeEpisodeResult.modifiedCount == 0) throw createError.InternalServerError("اپیزود مورد نظر حذف نشد")
            res.status(201).json({
                message: "حذف شدن اپیزود با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async editEpisode(req , res , next){
        try {
            
            const { id :EpisodeID} = await mongoIdSchema.validateAsync({id : req.params.EpisodeID})
            const {title , text , type} = req.body
            const data = {title , text , type}
            await addEpisodeSchema.validateAsync(data)
            const mainEpisode = await this.getOneEpisode(EpisodeID)
            res.send("kfjk")
            let episode
            if(req.file){
                const video = setImageInRequests(req.file)
                const seconds = await getVideoDurationInSeconds(setVideoInRequest(req.file))
                const time = returnTimeOfVideo(seconds)
                episode = {title , text , type , time, video}
            }else{
                episode = {title , text , type }
            }
            const updateEpisodeResult = await courseModel.updateOne({"chapters.episodes._id" : EpisodeID} , {
                $set : {
                    "chapters.$.episodes" : episode
                }
            })
            if(updateEpisodeResult.modifiedCount == 0) throw createError.InternalServerError("ویرایش اپیزود انجام نشد")
            res.status(201).json({
                message : "ویرایش اپیزود با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)   
        } 
    }
    async getOneEpisode(EpisodeID){
        const course = await courseModel.findOne({"chapters.episodes._id" : EpisodeID} , {
            "chapters.$.episodes" : 1
        })

        if(!course) throw createError.NotFound("اپیزودی یافت نشد")
        const episode = course.chapters[0].episodes[1]
        console.log(episode);
    }
}

module.exports = {
    episodeController : new episodeController()
}