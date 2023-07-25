const Joi = require('@hapi/joi')
const createCourseSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("نام دوره صحیح نمیباشد")),
    text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    short_text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    image : Joi.string().error(new Error("تصویر وارد شده صحیح نمیباشد")),
    category : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("دسته بندی مورد نظر یافت نشد")),
    price : Joi.number().error(new Error("قیمت وارد شده صحیح نیست")),
    discount : Joi.number().error(new Error("تخفیف وارد شده صحیح نیست")),
    type : Joi.string().regex(/(free|cash|special)/) , 

})
const addEpisodeSchema = Joi.object({
    title : Joi.string().error(new Error("عنوان وارد شده صحیح نمیباشد")),
    text : Joi.string().error(new Error("متن وارد شده صحیح نمیباشد")),
    type : Joi.string().regex(/(lock|unlock)/i).error(new Error("نوع وارد شده صحیح نمیباشد")),
    chapterID : Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("شناسه فصل مورد نظر صحیح نمیباشد")),
    courseID: Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).error(new Error("شناسه دوره مورد نظر صحیح نمیباشد")),
   // video : Joi.string().error(new Error("ویدئو وارد شده صحیح نمیباشد")),
})
module.exports = {
    createCourseSchema ,
    addEpisodeSchema
}